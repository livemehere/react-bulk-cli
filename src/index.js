#!/usr/bin/env node

const fs = require('fs/promises');
const fsSync = require('fs');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    {name:'files', alias:'f',type:String, multiple:true},
    {name:'dir', alias:'d',type:String, defaultValue:'generated'},
    {name:'extension', alias:'e',type:String, multiple:true,defaultValue:'jsx'},
    {name:'tag', alias:'t',type:String, multiple:true,defaultValue:'div'},
]
const options = commandLineArgs(optionDefinitions)

if(!options.files){
    throw new Error('--files for -f argument must be provided ')
}

class Writer {
    constructor(dir, name, extension) {
        this.string = '';
        this.dir = dir;
        this.name = name;
        this.extension = extension
        this.path = `${this.dir}/${this.name}.${this.extension}`;
    }

    appendAndNewLine(str){
        this.string += str;
        this.newline();
        return this;
    }

    append(str){
        this.string += str;
        return this;
    }

    newline(){
        this.string += '\n';
        return this;
    }

    tab(){
        this.string += '\t';
        return this;
    }

    mkdir(){
        if(!fsSync.existsSync(this.dir)){
            fsSync.mkdirSync(this.dir)
            console.log(`${this.dir} dir created`)
        }
    }

    async build(){
        this.mkdir();

        fs.writeFile(this.path, this.string,{encoding:'utf-8'}).then(()=>{
            console.log(`${this.path} is generated`);
        }).catch(e=>{
            console.log(e)
        })
    }
}

options.files.forEach(f=>{
    new Writer(options.dir,f,options.extension)
        .appendAndNewLine("import React from 'react';")
        .newline()
        .appendAndNewLine(`function ${f} () {`)
        .tab()
        .appendAndNewLine(`return <${options.tag}>${f}</${options.tag}>`)
        .appendAndNewLine('}')
        .newline()
        .append(`export default ${f}`)
        .build()
})
