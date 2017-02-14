#!/usr/bin/env bash
set -e


docker build -t test/nc_client_notifier .
docker run -p8080:8080 test/nc_client_notifier
