del DataMetaData\*.xml
del DataStores\*.xml
del Configuration\DynamicSqlDataProvider.config
del Configuration\DynamicXmlDataProvider.config
del Configuration\InstallationInformation.xml
del Configuration\SystemInitialized.xml
del Configuration\FirstTimeStart.xml
del ..\..\Bin\Composite.Generated.dll 
del ..\..\app_offline.htm /F
rd Packages /S /Q
md Packages
rd Cache\Assemblies /S /Q
md Cache\Assemblies
rd Cache\Temp /S /Q
md Cache\Temp
rd Cache\ResourceCache /S /Q
md Cache\ResourceCache
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
rd ApplicationState\SerializedConsoleMessages /S /Q
md ApplicationState\SerializedConsoleMessages
rd ApplicationState\SerializedWorkflows /S /Q
md ApplicationState\SerializedWorkflows
rd ..\..\Composite\InstalledPackages /S /Q
rd ..\..\Views /S /Q
rd Azure /S /Q
md Azure
rd InlineCSharpFunctions /S /Q
md InlineCSharpFunctions


copy TreeDefinitions\PageType.xml TreeDefinitions\PageType.xml.backup /y
:: del TreeDefinitions\*.xml
copy TreeDefinitions\PageType.xml.backup TreeDefinitions\PageType.xml /y
del TreeDefinitions\PageType.xml.backup

:: copy ..\..\..\AutoInstallPackages\Develop\BaseConfigurationDkUs.zip AutoInstallPackages /y


:: Basic cleanup
rd ..\..\Frontend\Composite  /S /Q

:: Starter site cleanup 
del ..\..\Frontend\Styles\1140.css
del ..\..\Frontend\Styles\ie.css
del ..\..\Frontend\Styles\layout.css
del ..\..\Frontend\Styles\mobile.css
del ..\..\Frontend\Styles\smallerscreen.css
del ..\..\Frontend\Styles\typeimg.css
del ..\..\favicon.ico


:: Blog cleanup
del ..\..\BlogRssFeed.ashx
del ..\..\BlogCommentsRssFeed.ashx
del ..\..\Bin\Composite.Community.Blog.dll
del ..\..\Bin\CookComputing.XmlRpcV2.dll
del ..\..\BlogMetaWeblog.ashx
del ..\..\App_GlobalResources\Composite\Community\Blog.resx
del TreeDefinitions\Composite.Community.Blog.xml
del TreeDefinitions\Composite.Community.Blog.Settings.xml
del TreeDefinitions\Composite.Community.Blog.Entries.xml
del TreeDefinitions\Composite.Community.Blog.Entries.xmll


:: Extranet cleanup
del ..\..\Bin\Composite.Community.Extranet.dll


:: Newsletter cleanup
del ..\..\Bin\Composite.Community.Newsletter.dll
del ..\..\Bin\Composite.Community.Newsletter.SubjectBased.dll
del ..\..\Bin\Composite.Community.Newsletter.DataTypeBased.dll
del ..\..\Bin\Composite.Community.Newsletter.FunctionBased.dll
del ..\..\Newsletter.ashx
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.Newsletter.SubjectBased.xml


:: Event calender cleanup
del ..\..\Bin\Composite.Community.EventCalendar.dll
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.EventCalendar.EventsApp.xml


:: ContactForm cleanup
del ..\..\App_GlobalResources\Composite\Community\ContactForm.resx
del ..\..\App_GlobalResources\Composite\Community\ContactForm.ru-RU.resx
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactForm.xml
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactFrom.EmailTemplate.xml
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactForm.xml 
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactFrom.EmailTemplate.xml 

:: Versioning cleanup
del ..\..\Bin\Composite.Versioning.ContentVersioning.dll


:: Base site cleanup
rd ..\..\Frontend\Composite\C1BaseSite /S /Q
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.News.NewsItem.da-dk.xml 
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.News.NewsItem.en-us.xml
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.TeaserSpot.da-dk.xml
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.TeaserSpot.en-us.xml
del TreeDefinitions\Composite.TemplateSites.Base01.News.NewsItem.xml 
del TreeDefinitions\Composite.TemplateSites.Base01.TeaserSpot.xml



:: Composite2.0.TemplateSites.Base01.zip

del ..\..\Frontend\Styles\Print.css /F
del ..\..\Frontend\Styles\Screen.css /F
del ..\..\Frontend\Styles\VisualEditor\VisualEditor.Config.css /F
del ..\..\Frontend\Styles\VisualEditor\VisualEditor.Config.xml /F
del ..\..\Frontend\Styles\VisualEditor\VisualEditor.Default.css /F





:: Omni corp cleanup
del ..\..\Frontend\Composite\Search\SimplePageSearch\Styles.css


:: Package create cleanup

rd ..\..\Composite\content\forms\InstalledPackages\Composite.Tools.PackageCreator /S /Q
del ..\..\Bin\Composite.Tools.PackageCreator.dll 
del ..\..\Composite\InstalledPackages\localization\Composite.Tools.PackageCreator.en-us.xml

