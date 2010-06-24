del DataMetaData\*.xml
del DataStores\*.xml
del Configuration\DynamicSqlDataProvider.config
del Configuration\DynamicXmlDataProvider.config
del ..\..\Bin\Composite.Generated.dll 
rd Packages /S /Q
md Packages
rd Cache\Assemblies /S /Q
rd DynamicTypeForms /S /Q
md DynamicTypeForms
rd ..\Xslt /S /Q
md ..\Xslt
rd LogFiles /S /Q
md LogFiles


copy TreeDefinitions\PageType.xml TreeDefinitions\PageType.xml.backup /y
:: del TreeDefinitions\*.xml
copy TreeDefinitions\PageType.xml.backup TreeDefinitions\PageType.xml /y
del TreeDefinitions\PageType.xml.backup

:: copy ..\..\..\AutoInstallPackages\Develop\BaseConfigurationDkUs.zip AutoInstallPackages /y


:: Blog cleanup
del ..\..\BlogRssFeed.ashx
del ..\..\Bin\Composite.Community.Blog.dll
del TreeDefinitions\Composite.Community.Blog.xml
del TreeDefinitions\Composite.Community.Blog.Settings.xml
del TreeDefinitions\Composite.Community.Blog.Entries.xml
del TreeDefinitions\Composite.Community.Blog.Entries.xmll