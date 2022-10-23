from ruamel.yaml import YAML
import json
import sys
from os import path


dest_path = 'startpage.html'
styles_path = 'style.css'
script_path = 'script.js'


def get_text_from_file(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def get_yaml_tree(yaml_path):
    yaml = YAML(typ="safe")
    with open(yaml_path, encoding='utf-8') as f:
        linktree = yaml.load(f)
        
    return linktree


def get_json_from_yaml(yaml_path):
    return json.dumps(get_yaml_tree(yaml_path), indent = 4)


def get_html_head():
    head = f"""<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title> Startpage </title>

    <!--<link rel="stylesheet" href="style.css">-->
    <style>
{get_text_from_file(styles_path)}
    </style>
</head>
"""
    return head


def get_script():
    return get_text_from_file(script_path)


def write_html(yaml_path):
    with open(dest_path, 'w+', encoding='utf-8') as f:
        f.write('<!DOCTYPE html>\n<html>\n')
        f.write(get_html_head())
        f.write('<body><div id="Tree">\n</div></body>')
        json_obj = f"let links = {get_json_from_yaml(yaml_path)}"
        f.write(f'<script>\n{json_obj}\n{get_script()}\n</script>')
        f.write('\n</html>')

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if path.exists(sys.argv[1]):
            write_html(sys.argv[1])
        else: print(f"File '{sys.argv[1]}' doesn't exist.")
    else:
        yaml_path = "decimal_links.yaml"
        if path.exists(yaml_path):
            write_html(yaml_path)
        else: print(f"No '{yaml_path}' file exists, nor was one given.")