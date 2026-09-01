test_range() {
  local lowerCount=$1
  local upperCount=$2
  local i

  for ((i=lowerCount; i<=upperCount; i++)); do
    ./run_tests.sh "$i" 2>&1 |
    while IFS= read -r line; do
      if [[ "$line" == PASS* ]]; then
        print -P "%F{green}✅ $line%f"

      elif [[ "$line" == FAIL* ]]; then
        print -P "%F{red}❌ $line%f"

      elif [[ "$line" =~ '^[0-9]+ passed, 0 failed$' ]]; then
        print -P "%F{green}🎉 $line%f"

      elif [[ "$line" =~ '^[0-9]+ passed, [0-9]+ failed$' ]]; then
        print -P "%F{red}❌ $line%f"

      else
        print -r -- "$line"
      fi
    done
  done
}