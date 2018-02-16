from setuptools import setup

exec (open('dash_materialsintelligence/version.py').read())

setup(
    name='dash-materialsintelligence',
    version=__version__,
    author='vtshitoyan',
    packages=['dash_materialsintelligence'],
    include_package_data=True,
    license='MIT',
    description='Dash UI component suite for materialsintelligence project',
    install_requires=[]
)
