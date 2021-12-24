#!/bin/bash
yarn install
yarn run build
go build .
gcloud app deploy