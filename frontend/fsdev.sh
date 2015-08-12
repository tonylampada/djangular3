#!/bin/bash
RESTORE='\033[0m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\e[0;33m'


# Cuz no one likes to be memorizing commands
# Instructions:
# 1) ". fsdev.sh"
# 2) "fshelp"
# 3) Be happy

export FS="$(dirname ${BASH_SOURCE[0]})"

#. ci/funcs.sh

function fshelp {
    echo -e "${GREEN}fshelp${RESTORE}            Prints this help"
    echo -e ""
    echo -e "${GREEN}devbuild${RESTORE}          Builds the entire front end into the ${RED}'dist'${RESTORE} folder,"
    echo -e "                  The resulting html will search for js files in the 'src' folder:"
    echo -e "                  Parameters:"
    echo -e "                  --mock <true|false> Use mock api (default: true)"
    echo -e ""
    echo -e "${GREEN}prodmock${RESTORE}          Builds the entire front end into the ${RED}'dist'${RESTORE} folder"
    echo -e "                  The resulting html will use the concatenated .js files in the 'dist' folder"
    echo -e "                  Uses the ${RED}mocked${RESTORE} json API"
    echo -e ""
    echo -e "${GREEN}prodbuild${RESTORE}         Builds the entire front end into the ${RED}'dist'${RESTORE} folder"
    echo -e "                  The resulting html will use the concatenated .js files in the 'dist' folder"
    echo -e "                  Uses the ${RED}real${RESTORE} json API"
    echo -e ""
    echo -e "${GREEN}copy2www${RESTORE}          Do a ${RED}prodbuild${RESTORE} and copy the resulting js and css"
    echo -e "                  to the 'www.freedomsponsors.org' project static files folder"
    echo -e ""
    echo -e "${GREEN}publish_ghpages${RESTORE}   Do a ${RED}prodmock${RESTORE} and commits the result in the ${RED}gh-pages${RESTORE} branch"
    echo -e "                  The result will be up in ${GREEN}http://freedomsponsors.github.io/fsstatic2${RESTORE}"
    echo -e ""
    echo -e "${GREEN}runjshint${RESTORE}         Checks ${RED}javascript${RESTORE} files for lint warnings"
    echo -e ""
    echo -e "${GREEN}runtests${RESTORE}          Runs the ${RED}javascript tests${RESTORE} (which should be located in src/**/docs/test_*.js)"
    echo -e "                  Parameters:"
    echo -e "                  --singleRun <true|false> Run tests ${RED}only once${RESTORE}; Default=false (Run everytime a file changes)"
    echo -e "                  --coverage <true|false> Generate coverage report in ${GREEN}coverage/${RESTORE} directory (default: false)"
    echo -e ""
    echo -e "${GREEN}runserver${RESTORE}         Runs the development playground on port ${RED}9001${RESTORE}"
    echo -e ""
    echo -e "${GREEN}produce_alias${RESTORE}     Prints instructions on how to create a persistent shortcut"
    echo -e "                  for this development environment"
    echo -e ""
}

function devbuild {
    CD=$(pwd)
    cd $FS
    dorun "gulp dev $*" "Dev Build"
    exitcode=$?
    cd $CD
    return $exitcode
}

function prodmock {
    CD=$(pwd)
    cd $FS
    dorun "gulp prod --mock true" "Prod build with mock API"
    exitcode=$?
    cd $CD
    return $exitcode
}

function prodbuild {
    CD=$(pwd)
    cd $FS
    dorun "gulp prod --mock false" "Prod build - real deal"
    exitcode=$?
    cd $CD
    return $exitcode
}

function copy2www {
    CD=$(pwd)
    cd $FS
    prodbuild
    cp -Rf dist/js dist/css ../www.freedomsponsors.org/djangoproject/statfiles/static/spa/
    cd $CD
    return $exitcode
}

function runserver {
    gulp runserver
}

function produce_alias {
    echo "The green command below will create an alias that you can use "
    echo "to drop into FS dev env from anywhere in your bash."
    echo "You might want to add it to your ~/.bashrc file"
    echo_green "alias fs='cd $(readlink -e $FS) && . fsdev.sh'"
}

function runjshint {
    CD=$(pwd)
    cd $FS
    dorun "gulp jshintall" "JS Hint"
    exitcode=$?
    cd $CD
    return $exitcode
}

function runtests {
    CD=$(pwd)
    cd $FS
    dorun "gulp test $*" "JS tests"
    exitcode=$?
    cd $CD
    return $exitcode
}

function publish_ghpages {
    CD=$(pwd)
    cd $FS
    mkdir -p /tmp/fs
    rm -Rf /tmp/fs/*
    prodmock
    cp -Rf ./dist/* /tmp/fs/
    git checkout gh-pages
    exitcode=$?
    if [ "$exitcode" != "0" ]
    then
        echo_red "Whoops, could not change branch. Maybe you have uncommited changes."
        return 1
    fi
    cp -Rf /tmp/fs/* ./
    echo_green "Status 1:"
    git status
    git add .
    echo_green "Status 2:"
    git status
    git commit -m 'publishing to gh-pages'
    echo_green "Status 3:"
    git status
    git push
    git checkout master
    cd $CD
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

echo_green "Welcome to the FS development environment. See available commands below:"
echo_green "Hint: autocomplete should be enabled for them ;)"
echo_red   "------------------------------------------------------------------------"
fshelp
