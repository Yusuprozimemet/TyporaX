from setuptools import setup, find_packages

setup(
    name='TyporaX',
    version='0.1.0',
    description='Quick version of Typora with ChatGPT support',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    author='Yusup Rozimemet',
    author_email='yusup.rozimemet@example.com',
    url='https://github.com/YusupRozimemet/TyporaX.git',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'Flask>=2.0',
        'PyYAML>=5.4',
        'requests',
        'tiktoken',
    ],
    entry_points={
        'console_scripts': [
            'typora-x=typora_x.app:main', 
        ],
    },
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License', 
        'Programming Language :: Python :: 3.10',
    ],
    python_requires='>=3.10',
    zip_safe=False,
)
