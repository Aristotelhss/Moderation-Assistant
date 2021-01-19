const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function find_nested(dir, pattern) {

    let results = [];

    fs.readdirSync(dir).forEach(inner_dir => {

        inner_dir = path.resolve(dir, inner_dir);
        const stat = fs.statSync(inner_dir);

        if (stat.isDirectory()) {
            results = results.concat(find_nested(inner_dir, pattern));
        }

        if (stat.isFile() && inner_dir.endsWith(pattern)) {
            results.push(inner_dir);
        }

    });

    return results;
}

const cmd_files = find_nested("./commands/", ".js");

module.exports.setup = (client) => {

    fs.readdir("./events/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.log(chalk.red("Something went wrong, there are no events to load!"));
        console.log(chalk.green(`LOADED ${jsfiles.length} EVENTS.`));
        jsfiles.forEach((f, i) => {
            require(`../events/${f}`);
        });
    });

    if (cmd_files.length <= 0) return console.log(chalk.red("Something went wrong, there are no commands to load!"));
    cmd_files.forEach(file => {
        const props = require(file);
        client.commands.set(props.help.name, props);
    });
    console.log(chalk.green(`LOADED ${cmd_files.length} COMMANDS.`));

};