#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\e[0;33m'


# Pq ninguem merece ter que ficar decorando comando
# Instruções:
# 1) ". dev.sh"
# 2) "devhelp"
# 3) Seja feliz


workon djangular3  # Muda isso pro nome do virtalenv do seu projeto

if [ "${BASH_SOURCE}" -eq "" ]; then
    THIS_SCRIPT_PATH=$(readlink -f ${(%):-%N})
else
    THIS_SCRIPT_PATH=$BASH_SOURCE
fi
export PROJ_BASE=$(dirname $THIS_SCRIPT_PATH)

#. ci/funcs.sh

function devhelp {
    echo -e "${GREEN}devhelp${RESTORE}           Imprime este ${RED}help${RESTORE}"
    echo -e ""
    echo -e "${GREEN}pytests${RESTORE}           Roda os ${RED}testes${RESTORE} python"
    echo -e ""
    echo -e "${GREEN}djangorun${RESTORE}         Sobe o backend ${RED}django${RESTORE}"
    echo -e ""
    echo -e "${GREEN}frontdev${RESTORE}          Constrói o frontend na pasta ${RED}'frontend/dist'${RESTORE},"
    echo -e "                  O html resultante vai procurar os arquivos js na pasta 'frontend/src'"
    echo -e "                  Parametros:"
    echo -e "                  --mock <true|false> Use mock api (default: true)"
    echo -e ""
    echo -e "${GREEN}frontrun${RESTORE}          Roda o "playground front-end" na porta ${RED}9001${RESTORE}"
    echo -e ""
    echo -e "${GREEN}frontprodmock${RESTORE}     Constrói o frontend na pasta  ${RED}'frontend/dist'${RESTORE}"
    echo -e "                  O html resultante vai procurar os arquivos .js concatenados na pasta 'frontend/dist'"
    echo -e "                  Usa a API ${RED}mock${RESTORE}"
    echo -e "                  Parametros:"
    echo -e "                  --minify <true|false> Gera js e css minificado (default: true)"
    echo -e ""
    echo -e "${GREEN}frontprod${RESTORE}         Constrói o frontend na pasta  ${RED}'frontend/dist'${RESTORE}"
    echo -e "                  O html resultante vai procurar os arquivos .js concatenados na pasta 'frontend/dist'"
    echo -e "                  Usa a API ${RED}de verdade${RESTORE}"
    echo -e "                  Parametros:"
    echo -e "                  --minify <true|false> Gera js e css minificado (default: true)"
    echo -e ""
    echo -e "${GREEN}copy2www${RESTORE}          Faz um ${RED}prodbuild${RESTORE} e copia o js+css resultante"
    echo -e "                  pra pasta de resources estáticos do projeto django"
    echo -e ""
    echo -e "${GREEN}runjshint${RESTORE}         Roda análise estática do código ${RED}javascript${RESTORE}"
    echo -e ""
    echo -e "${GREEN}jstests${RESTORE}           Roda os ${RED}testes javascript${RESTORE} (que devem existir em src/**/docs/test_*.js)"
    echo -e "                  Parâmetros:"
    echo -e "                  --singleRun <true|false> Roda testes ${RED}apenas uma vez${RESTORE}; Default=false (Roda sempre que algum arquivo mudar)"
    echo -e "                  --coverage <true|false> gera relatório de cobertura na pasta ${GREEN}frontend/coverage/${RESTORE} (default: false)"
    echo -e ""
    echo -e "${GREEN}produce_alias${RESTORE}     Imprime instruções pra criar um atalho persistente"
    echo -e "                  pra este ambiente de desenvolvimento"
    echo -e ""
}

function pytests {
    pushd $PROJ_BASE
    dorun "./manage.py test cameras" "Testes python"
    exitcode=$?
    popd
    return $exitcode
}

function djangorun {
    pushd $PROJ_BASE
    dorun "./manage.py runserver" "Servidor django"
    exitcode=$?
    popd
    return $exitcode
}

function frontdev {
    pushd $PROJ_BASE/frontend
    dorun "gulp dev $*" "Dev Build"
    exitcode=$?
    popd
    return $exitcode
}

function frontprodmock {
    pushd $PROJ_BASE/frontend
    dorun "gulp prod --mock true $*" "Prod build with mock API"
    exitcode=$?
    popd
    return $exitcode
}

function frontprod {
    pushd $PROJ_BASE/frontend
    dorun "gulp prod --mock false $*" "Prod build - real deal"
    exitcode=$?
    popd
    return $exitcode
}

function copy2www {
    pushd $PROJ_BASE/frontend
    frontprod
    mkdir -p ../cameras/static/
    cp -Rf dist/js dist/css ../cameras/static/
    popd
    return $exitcode
}

function frontrun {
    pushd $PROJ_BASE/frontend
    gulp runserver
    exitcode=$?
    popd
    return $exitcode
}

function runjshint {
    pushd $PROJ_BASE/frontend
    dorun "gulp jshintall" "JS Hint"
    exitcode=$?
    popd
    return $exitcode
}

function jstests {
    pushd $PROJ_BASE/frontend
    dorun "gulp test $*" "JS tests"
    exitcode=$?
    popd
    return $exitcode
}

function produce_alias {
    echo "------------------------------------------------------------------------"
    echo "Esse comando verdinho aih cria um alias que vc pode usar"
    echo "pra cair no ambdev deste projeto a partir de qualquer lugar do seu bash."
    echo "Sugestão: adiciona no seu ~/.bashrc"
    echo "Sugestão2: Muda o nome desse alias aih pra algo mais adequado"
    echo "------------------------------------------------------------------------"
    echo_green "alias dj3='cd $(readlink -e $PROJ_BASE) && . dev.sh'"
    echo "------------------------------------------------------------------------"
}

function echo_red {
    echo -e "\e[31m$1\e[0m";
}

function echo_green {
    echo -e "\e[32m$1\e[0m";
}

function echo_yellow {
    echo -e "${YELLOW}$1${RESTORE}";
}

function now_milis {
    date +%s%N | cut -b1-13
}

function dorun {
    cmd="$1"
    name="$2"
    echo ----------------------------------
    echo_green "STARTING $name ..."
    echo "$cmd"
    t1=$(now_milis)
    eval $cmd
    exitcode=$?
    t2=$(now_milis)
    delta_t=$(expr $t2 - $t1)
    if [ $exitcode == 0 ]
    then
        echo_green "FINISHED $name in $delta_t ms"
        echo ----------------------------------
    else
        echo_red "ERROR! $name (status: $exitcode, time: $delta_t ms)"
        echo ----------------------------------
        return $exitcode
    fi
}

echo_green "Bem vindo, blablabla, customize essa mensagem com o q vc quiser:"
echo_green "Dica: autocomplete funciona pros comandos abaixo ;)"
echo_red   "------------------------------------------------------------------------"
devhelp
