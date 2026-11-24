import os
import shutil
from PIL import Image

def build_gif():
    frames_dir = 'walkthrough_frames'
    artifact_dir = r'C:\Users\shalika shahana\.gemini\antigravity\brain\cd3969d1-031e-4d66-9397-c79c6b958643'
    os.makedirs(artifact_dir, exist_ok=True)

    files = sorted([f for f in os.listdir(frames_dir) if f.startswith('walk_') and f.endswith('.jpg')])
    if not files:
        print('No frames found.')
        return

    images = []
    for f in files:
        im = Image.open(os.path.join(frames_dir, f))
        # Resize to 640x360 for light, buttery playback
        im_small = im.resize((640, 360), Image.Resampling.LANCZOS).convert('P', palette=Image.Palette.ADAPTIVE, colors=128)
        images.append(im_small)

    gif_path = os.path.join(artifact_dir, 'scroll_walkthrough.gif')
    local_gif_path = 'scroll_walkthrough.gif'
    images[0].save(
        gif_path,
        save_all=True,
        append_images=images[1:],
        duration=180,
        loop=0,
        optimize=True
    )
    shutil.copyfile(gif_path, local_gif_path)
    print(f'Saved walkthrough gif to {gif_path} ({os.path.getsize(gif_path)} bytes)')

    # Copy key screenshots to artifact directory
    verif_dir = 'verification_screenshots'
    if os.path.exists(verif_dir):
        for img_name in os.listdir(verif_dir):
            if img_name.endswith('.png'):
                shutil.copyfile(os.path.join(verif_dir, img_name), os.path.join(artifact_dir, img_name))
        print('Copied verification screenshots to artifact directory.')

if __name__ == '__main__':
    build_gif()
