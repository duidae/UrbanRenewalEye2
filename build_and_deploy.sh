#!/bin/bash
yarn install
yarn run build
gcloud app deploy