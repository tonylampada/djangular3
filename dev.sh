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

export PROJ_BASE="$(dirname ${BASH_SOURCE[0]})"
CD=$(pwd)
cd $PROJ_BASE
export PROJ_BASE=$(pwd)
cd $CD

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
    echo -e ""
    echo -e "${GREEN}frontprod${RESTORE}         Constrói o frontend na pasta  ${RED}'frontend/dist'${RESTORE}"
    echo -e "                  O html resultante vai procurar os arquivos .js concatenados na pasta 'frontend/dist'"
    echo -e "                  Usa a API ${RED}de verdade${RESTORE}"
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
    CD=$(pwd)
    cd $PROJ_BASE
    dorun "./manage.py test cameras" "Testes python"
    exitcode=$?
    cd $CD
    return $exitcode
}

function djangorun {
    CD=$(pwd)
    cd $PROJ_BASE
    dorun "./manage.py runserver" "Servidor django"
    exitcode=$?
    cd $CD
    return $exitcode
}

function frontdev {
    CD=$(pwd)
    cd $PROJ_BASE/frontend
    dorun "gulp dev $*" "Dev Build"
    exitcode=$?
    cd $CD
    return $exitcode
}

function frontprodmock {
    CD=$(pwd)
    cd $PROJ_BASE/frontend
    dorun "gulp prod --mock true" "Prod build with mock API"
    exitcode=$?
    cd $CD
    return $exitcode
}

function frontprod {
    CD=$(pwd)
    cd $PROJ_BASE/frontend
    dorun "gulp prod --mock false" "Prod build - real deal"
    exitcode=$?
    cd $CD
    return $exitcode
}

function copy2www {
    CCD=$(pwd)
    cd $PROJ_BASE/frontend
    frontprod
    mkdir -p ../cameras/static/
    cp -Rf dist/js dist/css ../cameras/static/
    cd $CCD
    return $exitcode
}

function frontrun {
    CD=$(pwd)
    cd $PROJ_BASE/frontend
    gulp runserver
    exitcode=$?
    cd $CD
    return $exitcode
}

function runjshint {
    CD=$(pwd)
    cd $PROJ_BASE/frontend
    dorun "gulp jshintall" "JS Hint"
    exitcode=$?
    cd $CD
    return $exitcode
}

function jstests {
    CD=$(pwd)
    cd $PROJ_BASE/frontend
    dorun "gulp test $*" "JS tests"
    exitcode=$?
    cd $CD
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
    $cmd
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
