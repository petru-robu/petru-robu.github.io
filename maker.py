import os
import shutil

def get_html_raw(path):
    f = open(path, 'r')
    html = ''
    for line in f:
        html += line

    f.close()
    return html

def extraction(path, pos):
    start, end = pos[0], pos[1]
    f = open(path, 'r')
    ext = ''

    idx = 0
    for line in f:
        if idx >= start:
            ext += line
        
        if idx == end:
            break
        idx += 1

    f.close()
    return ext

def parse_html_tag(path, tag):
    f = open(path, 'r')

    idx, start, end = 0, 0, 0
    in_section = False
    
    for line in f:
        if tag in line:
            in_section = True
            start = idx

        if '</' + tag[1:] in line:
            in_section = False
            end = idx + 1
            break
        idx += 1
    f.close()
    return (start, end)

def change_text(path, pos, new_text):
    f = open(path, 'r')
    lines = f.readlines()
    f.close()

    start, end = pos[0], pos[1]
    
    lines[start:end] = [new_text + '\n']
    
    f = open(path, 'w')
    
    f.writelines(lines)
    f.close
    

class SitePage:
    def __init__(self, path):
        self.root = path
        self.index = self.root + 'index.html'
        
        self.html = get_html_raw(self.index)

        self.phead = parse_html_tag(self.index, '<head>')
        self.pnav = parse_html_tag(self.index, '<nav>')

    def extract_head(self):
        return extraction(self.index, self.phead)

    def extract_nav(self):
        parsed_nav = parse_html_tag(self.index, '<nav>')
        return extraction(self.index, self.pnav)
    
    def change_nav(self):
        curr_nav = self.extract_nav()
        curr_nav += '\n' + 


if __name__ == '__main__':
    s = SitePage('./testing/')
