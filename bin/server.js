#!/usr/bin/env node
import getServer from '..';


getServer().listen(process.env.PORT || 4000);
