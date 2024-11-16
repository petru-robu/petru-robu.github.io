import os
import shutil

class HTMLPage():
    def __init__(self, page_name):
        self.page_name = page_name
    
    def create_file_structure(self):
        root = self.page_name + '/'
        html_file_path = root + 'index.html'
        css_file_path = root +'styles.css'
        img_dir_path = root + 'img'
        js_dir_path = root + 'js'

        os.mkdir(root)
        os.mkdir(img_dir_path)
        os.mkdir(js_dir_path)

        with open(html_file_path, 'w') as fp:
            pass
        with open(css_file_path, 'w') as fp:
            pass

    def create_html(self):
        index_txt = ''
        index_txt += f"""<!DOCTYPE html>
<html>
<head>
    <title>{self.page_name}</title>
    <link rel="stylesheet" type="text/css" href="../styles.css"/>
    <link rel="stylesheet" type="text/css" href="styles.css"/>
</head>

<body>
    <h1>This is a heading.</h1>
</body>
            
</html>"""
        f = open(self.page_name + '/index.html', "w")
        f.write(index_txt)

    def link_in_main_index(self, page_title = None):

        if page_title == None:
            page_title = self.page_name

        f = open('index.html', 'r')
        content = f.readlines()

        cnt, start_idx, end_idx = 0, -1, -1
        
        for line in content:
            cnt+=1
            if '<nav class="menu">' in line:
                start_idx = cnt
            if start_idx != -1 and '</nav>' in line:
                end_idx = cnt
                break
            
        ans, cnt = '', 0
        
        for line in content:
            cnt+=1
            if cnt < end_idx:
                ans += line
            else:
                break

        ans += f'\t\t\t\t<li><a href="{self.page_name}/index.html">{page_title}</a></li>\n'
        
        ans += ''.join(content[end_idx-1:])
        f = open('index.html', 'w')
        f.write(ans)

    def unlink_in_main(self):
        f = open('index.html', 'r')
        content = f.readlines()
    
        cnt, ok = 0, False
        for line in content:
            cnt += 1
            if f'<li><a href="{self.page_name}/index.html">' in line:
                ok = True
                break

        if ok:
            del content[cnt]

            f = open('index.html', 'w')
            f.write(''.join(content))
        else:
            return
        

    def create(self):
        self.create_file_structure()
        self.create_html()
        self.link_in_main_index()
    
    def destroy(self):
        shutil.rmtree(self.page_name)
        self.unlink_in_main()

if __name__ == '__main__':

    p1 = HTMLPage('4_TicTacToe')
    p1.create()