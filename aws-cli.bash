aws dynamodb scan \
 --table-name oxygen --filter-expression "device_id = :d AND measure_time = :n" \
  --expression-attribute-values '{":d":{"S": "ansim01"},":n": {"N":"1701222628347"}}'