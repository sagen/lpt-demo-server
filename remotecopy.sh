#!/bin/bash
while true; do rsync -avz kode/* $lptgrp@lpt.cookiejar.no:web/; sleep 5; done;
