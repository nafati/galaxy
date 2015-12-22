#!/bin/bash

usage() {
cat << EOF
Usage: ${0##*/} [-i] /path/to/galaxy...
Sync galaxy-lib modules to those same modules in Galaxy directory (or vice versa if -i).

EOF
}

if [ $# -lt 1 ]; then
    usage
    exit 1
fi

invert=0
OPTIND=1
while getopts ":i" opt; do
    case "$opt" in
        h)
            usage
            exit 0
            ;;
        i)
            invert=1
            ;;
        '?')
            usage >&2
            exit 1
            ;;
    esac
done
shift "$((OPTIND-1))" # Shift off the options and optional --.

PROJECT_DIRECTORY="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_TEST_DIR=$PROJECT_DIRECTORY/tests
GALAXY_DIRECTORY=$1
GALAXY_LIB_DIR=$GALAXY_DIRECTORY/lib
GALAXY_UNIT_TEST_DIR=$GALAXY_DIRECTORY/test/unit


UTIL_FILES=(__init__.py aliaspickler.py bunch.py checkers.py dictobj.py dictifiable.py directory_hash.py docutils_template.txt expressions.py heartbeat.py heartbeat.py inflection.py json.py jstree.py lazy_process.py odict.py object_wrapper.py plugin_config.py properties.py simplegraph.py sleeper.py sockets.py specs.py sqlite.py submodules.py topsort.py topsort.py xml_macros.py)
GALAXY_LIB=(galaxy/objectstore galaxy/tools/deps galaxy/tools/parser galaxy/jobs/metrics galaxy/tools/linters galaxy/tools/loader_directory.py galaxy/tools/loader.py galaxy/tools/lint.py galaxy/tools/lint_util.py galaxy/tools/deps galaxy/tools/toolbox galaxy/exceptions)
TEST_FILES=(tools/test_parsing.py tools/test_toolbox_filters.py test_sqlite_utils.py tools/test_tool_deps.py tools/test_tool_loader.py test_topsort.py test_sockets.py test_objectstore.py test_lazy_process.py)

if [ "$invert" -ne "1" ];
then

    for f in "${UTIL_FILES[@]}"
    do
        cp $PROJECT_DIRECTORY/galaxy/util/$f $GALAXY_LIB_DIR/galaxy/util
    done

    for f in "${GALAXY_LIB[@]}"
    do
        rm -rf $GALAXY_LIB_DIR/$f
        cp -r $PROJECT_DIRECTORY/$f $GALAXY_LIB_DIR/$f
    done

    for f in "${TEST_FILES[@]}"
    do
        rm -rf $GALAXY_UNIT_TEST_DIR/$f
        cp -r $PROJECT_TEST_DIR/$f $GALAXY_UNIT_TEST_DIR/$f
    done

else

    rm -rf $PROJECT_DIRECTORY/galaxy/util/*
    for f in "${UTIL_FILES[@]}"
    do
        cp -r $GALAXY_LIB_DIR/galaxy/util/$f $PROJECT_DIRECTORY/galaxy/util
    done

    for f in "${GALAXY_LIB[@]}"
    do
        rm -rf $PROJECT_DIRECTORY/$f
        cp -r $GALAXY_LIB_DIR/$f $PROJECT_DIRECTORY/$f
    done

    for f in "${TEST_FILES[@]}"
    do
        rm -rf $PROJECT_TEST_DIR/$f
        cp -r $GALAXY_UNIT_TEST_DIR/$f $PROJECT_TEST_DIR/$f
    done

fi
