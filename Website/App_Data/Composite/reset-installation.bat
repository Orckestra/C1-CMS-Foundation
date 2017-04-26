del DataMetaData\*.xml
del DataStores\*.xml
del Configuration\DynamicSqlDataProvider.config
del Configuration\DynamicXmlDataProvider.config
del Configuration\InstallationInformation.xml
del Configuration\SystemInitialized.xml
del Configuration\FirstTimeStart.xml
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
rd ..\..\App_Data\UserControls /S /Q
rd ..\..\App_Data\PageTemplateFeatures /S /Q

:: Razor cleanup
copy ..\..\App_Data\Razor\web.config ..\..\App_Data\Razor.web.config
rd ..\..\App_Data\Razor /S /Q
md ..\..\App_Data\Razor
copy ..\..\App_Data\Razor.web.config ..\..\App_Data\Razor\web.config
del ..\..\App_Data\Razor.web.config /f


:: PageTemplates cleanup
copy ..\..\App_Data\PageTemplates\web.config ..\..\App_Data\PageTemplates.web.config
rd ..\..\App_Data\PageTemplates /S /Q
md ..\..\App_Data\PageTemplates
copy ..\..\App_Data\PageTemplates.web.config ..\..\App_Data\PageTemplates\web.config
del ..\..\App_Data\PageTemplates.web.config /f

:: License file cleanup
del PackageLicenses\*.* /y

:: Assembly cleanup
rmdir ..\..\bin /S /Q
mkdir ..\..\bin

:: Starter site cleanup 
del ..\..\favicon.ico

rd /s /q ..\..\Frontend\Scripts
rd /s /q ..\..\Frontend\Styles
rd /s /q ..\..\Frontend\Images
rd /s /q ..\..\Frontend\Composite


:: Blog cleanup
del ..\..\BlogRssFeed.ashx
del ..\..\BlogCommentsRssFeed.ashx
del ..\..\BlogMetaWeblog.ashx
del ..\..\App_GlobalResources\Composite\Community\Blog.resx
del ..\..\App_GlobalResources\Composite\Community\Blog.ru-ru.resx
del TreeDefinitions\Composite.Community.Blog.xml
del TreeDefinitions\Composite.Community.Blog.Settings.xml
del TreeDefinitions\Composite.Community.Blog.Entries.xml
del TreeDefinitions\Composite.Community.Blog.Entries.xmll


:: Newsletter cleanup
del ..\..\Newsletter.ashx
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.Newsletter.SubjectBased.xml
rd /s /q ..\..\App_Data\NewsletterType
del ..\..\App_GlobalResources\Composite\Community\Newsletter.resx


:: package frontend files
rd /s /q ..\..\Frontend\Composite


:: Event calender cleanup
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.EventCalendar.EventsApp.xml


:: ContactForm cleanup
del ..\..\App_GlobalResources\Composite\Community\ContactForm.resx
del ..\..\App_GlobalResources\Composite\Community\ContactForm.ru-RU.resx
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactForm.xml
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactFrom.EmailTemplate.xml
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactForm.xml 
del ..\..\App_Data\Composite\TreeDefinitions\Composite.Community.ContactFrom.EmailTemplate.xml 

:: Versioning cleanup
del TreeDefinitions\Composite.Versioning.ContentVersioning.xml


:: Base site cleanup
rd ..\..\Frontend\Composite\C1BaseSite /S /Q
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.News.NewsItem.da-dk.xml 
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.News.NewsItem.en-us.xml
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.TeaserSpot.da-dk.xml
del ..\..\Composite\InstalledPackages\localization\Composite.TemplateSites.Base01.TeaserSpot.en-us.xml
del TreeDefinitions\Composite.TemplateSites.Base01.News.NewsItem.xml 
del TreeDefinitions\Composite.TemplateSites.Base01.TeaserSpot.xml

copy ..\..\DebugBuild.Web.config ..\..\Web.config /y
copy DebugBuild.Composite.config Composite.config /y


:: Composite2.0.TemplateSites.Base01.zip

del ..\..\Frontend\Styles\Print.css /F
del ..\..\Frontend\Styles\Screen.css /F
del ..\..\Frontend\Styles\VisualEditor\VisualEditor.Config.css /F
del ..\..\Frontend\Styles\VisualEditor\VisualEditor.Config.xml /F
del ..\..\Frontend\Styles\VisualEditor\VisualEditor.Default.css /F


:: XML Data Provider
del Configuration\DynamicXmlDataProvider.config


:: Omni corp cleanup
del ..\..\Frontend\Composite\Search\SimplePageSearch\Styles.css


:: Package create cleanup

rd ..\..\Composite\content\forms\InstalledPackages\Composite.Tools.PackageCreator /S /Q
del ..\..\Composite\InstalledPackages\localization\Composite.Tools.PackageCreator.en-us.xml
rd /s /q ..\..\App_Data\PackageCreator

:: Form builder
del Configuration\Composite.Forms.FormBuilder.xml

:: Image Crop
del Configuration\Composite.Media.ImageCrop.xml

:: Event
rd /s /q ..\..\RSS
rd /s /q ..\..\App_GlobalResources


:: components
del /q "..\Components\*"
FOR /D %%p IN ("..\Components\*.*") DO rmdir "%%p" /s /q
