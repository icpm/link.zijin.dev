npm ci
npm i pm2 serve -g
npm run build

cp ../dotenv/link.zijin.dev.env .env

command="cd link.zijin.dev && git pull && npm ci && npm run build"
job="0 0 * * * $command"
cat <(fgrep -i -v "$command" <(crontab -l)) <(echo "$job") | crontab -
