import eel
import os
dir_path = os.path.dirname(os.path.realpath(__file__))
web_path = os.path.join(dir_path, 'web')
eel.init(web_path)
eel.start('site.html')