# Set
curl http://localhost:8545 \
    -X POST \
    -H "Content-Type: application/json" \
    --data "{
        \"method\":\"anvil_setBalance\",
        \"params\":[\"0xccFa6A61B2C8BbA2B160c217d5b1D96ad18a6bE5\", \"0x56BC75E2D63100000\"],
        \"id\":1,
        \"jsonrpc\":\"2.0\"
    }"
