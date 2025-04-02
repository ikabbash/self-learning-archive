# Redis

- If you got `WRONGTYPE Operation against a key holding the wrong kind of value` while trying to `GET` a key, double check the key using `TYPE` to see if its a string or hash because if its not a string, the error would occur when doing `GET key`.

# Wordpress

- Wordpress (and maybe other CMS apps) save the URLs in the database, so in case you wanted to migrate the app and use a new domain, the URLs in the database will need to be changed.