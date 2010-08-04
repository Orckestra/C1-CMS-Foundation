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
rd ..\..\App_Code /S /Q
md ..\..\App_Code
rd ..\Media /S /Q
md ..\Media
rd ..\PageTemplates /S /Q
md ..\PageTemplates



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


:: Base site cleanup

rd ..\..\Frontend\Composite\C1BaseSite /S /Q
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.News.NewsItem.da-dk.xml 
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.News.NewsItem.en-us.xml
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.TeaserSpot.da-dk.xml
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.TeaserSpot.en-us.xml
del TreeDefinitions\Composite.TemplateSites.Base01.News.NewsItem.xml 
del TreeDefinitions\Composite.TemplateSites.Base01.TeaserSpot.xml