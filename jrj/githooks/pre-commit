#!/bin/sh

cd "$(cd "$(dirname "$0")"; pwd -P)/../../"
files=($(git status -bs | grep '^[MAU]' | awk '{print $2}'))
if [ ${#files[@]} -gt 0 ]; then
  for file in ${files[*]}
  do
    IFS=.
    ary=($file)
    IFS=
    len=`expr ${#ary[@]} - 1`
    if [ "${ary[$len]}" = "js" -o "${ary[$len]}" = "json" -o "${ary[$len]}" = "vue" ]; then
      coffee beautifiers/beautify.coffee $file
    fi
  done
  git add .
fi
exit 0
