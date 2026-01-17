#!/bin/bash

# Test request using socat
echo '{"source_code":"fn add(a: i32, b: i32) -> i32 {\n\n}","cursor_byte":36,"backend":"Gemini","file_type":"rust"}' | socat - UNIX-CONNECT:/tmp/chace.sock
