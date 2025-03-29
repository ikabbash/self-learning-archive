- To change [cleanup](https://github.com/getsentry/self-hosted/blob/f2e2dc2bb3c0c2505d0a6044989bdd29c7905fef/docker-compose.yml#L318-L326) schedule or check the number of days, check the following [article](https://forum.sentry.io/t/changing-sentry-event-retention-days-does-not-work/15313).
- You can change Sentry’s root URL by modifying the config yaml file and adding `system.url-prefix`, [reference](https://develop.sentry.dev/config/#general).
- In your Redis instance limit the memory usage and change max memory policy to its default one because Redis doesn’t release memory sometimes.
    
    ```yaml
    redis:
        <<: *restart_policy
        image: "redis:6.2.13-alpine"
    		# only add the line below
        command: ["/usr/local/bin/redis-server", "--maxmemory", "4092M", "--maxmemory-policy" ,"volatile-ttl"]
    ```
    
- In case the SMTP is not working and you want to invite someone and they can’t receive the invite link, use `docker exec` to get inside the Postgres container and access the database, retrieve the database the token using this query:
    
    ```sql
    SELECT id, email, token FROM sentry_organizationmember WHERE email = 'user-email@example.com';
    ```
    
    - Then construct the invite link like the following: `https://<your-sentry-domain>/accept/<user-id>/<token>/`.
- If you wanna change password for a user using CLI check [this](https://sentry.io/answers/how-to-reset-django-admin-password/).
- You can run `docker compose run --rm web createuser` to create a new user.
- SMTP settings can be updated in the `sentry/config.yml` file, after that execute the `install.sh` script again ([reference](https://develop.sentry.dev/self-hosted/email/)).