!/bin/bash
kodepath=kode
while true; do tmp=`find $kodepath -type f -exec cat {} + | shasum`; if [ "$previoussha" != "$tmp" ]; then echo; echo `date` Change detected! Copying to remote server; echo; scp -r $kodepath/* $lptgrp@lpt.cookiejar.no:web/; previoussha=$tmp; fi; sleep 1; done;
