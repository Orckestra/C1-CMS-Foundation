const removePaths = [
	'App_Data/Composite/Configuration/Composite.Forms.FormBuilder.xml',
	'App_Data/Composite/Configuration/Composite.Media.ImageCrop.xml',
	'App_Data/Composite/Configuration/DynamicXmlDataProvider.config',
	'App_Data/Composite/Configuration/DynamicSqlDataProvider.config',
	'App_Data/Composite/Configuration/FirstTimeStart.xml',
	'App_Data/Composite/Configuration/InstallationInformation.xml',
	'App_Data/Composite/Configuration/SystemInitialized.xml',
	'App_Data/Composite/DataMetaData/',
	'App_Data/Composite/DataStores/',
	'App_Data/Composite/DynamicTypeForms/*',
	'App_Data/Composite/InlineCSharpFunctions/',
	'App_Data/Composite/LanguagePacks/',
	'App_Data/Composite/PackageLicenses/',
	'App_Data/Composite/Azure/',
	'App_Data/Composite/Packages/*',
	'App_Data/Media/*',
	'App_Data/PageTemplateFeatures/',
	'App_Data/PageTemplates/*.cshtml',
	'App_Data/PageTemplates/*.master*',
	'App_Data/Razor/Composite/',
	'App_Data/Razor/Orckestra/',
	'App_Data/Razor/Layout/',
	'App_Data/Razor/PageBlocks/',
	'App_Data/Razor/Widgets/',
	'App_Data/Razor/Content/',
	'App_Data/Razor/ -- !(web.config) ',
	'App_Data/Components/',
	'App_GlobalResources/',
	'BlogMetaWeblog.ashx',
	'BlogRssFeed.ashx',
	'Composite/InstalledPackages/',
	'Frontend/Composite/',
	'Frontend/Orckestra/',
	'Frontend/Images/*',
	'Frontend/Scripts/*',
	'Frontend/Styles/VisualEditor.less',
	'Frontend/Styles/style.less',
	'Frontend/Styles/style.min.css',
	'Frontend/Styles/bootstrap',
	'Frontend/Styles/font-awesome',
	'Frontend/Styles/includes',
	'Frontend/Styles/PageBlocks',
	'Frontend/Styles/style.less',
	'Frontend/Styles/style.min.css',
	'Frontend/Styles/VisualEditor.common.less',
	'Frontend/Styles/VisualEditor.less',
	'Frontend/fonts/',
	'bin/Antlr3.Runtime.dll',
	'bin/Composite.Community.*.*',
	'bin/Composite.Forms.FormBuilder.dll',
	'bin/Composite.Forms.Renderer.dll',
	'bin/Composite.Media.*.*',
	'bin/Composite.Search.SimplePageSearch.dll',
	'bin/Composite.XmlSerializers.dll',
	'bin/Composite.Tools.*.*',
	'bin/Composite.Web.*.*',
	'bin/Orckestra.Web.Css.Less.dll',
	'bin/CookComputing.XmlRpcV2.dll',
	'bin/ICSharpCode.SharpZipLib.dll',
	'bin/System.Web.Optimization.dll',
	'bin/WebGrease.dll',
	'Frontend/Composite/',
	'App_Data/UserControls/ -- !(web.config)',
	'App_Data/PageTemplateFeatures/',
	'Web.config',
	'App_Data/Composite/Composite.config',
	'App_Data/Composite/Cache/Assemblies/*',
	'App_Data/Composite/Cache/',
	'App_Data/Xslt/*',
	'App_Data/Composite/LogFiles/*',
	'App_Code/*',
	'App_Data/Composite/ApplicationState/',
	'Composite/InstalledPackages/',
	'BlogRssFeed.ashx',
	'BlogCommentsRssFeed.ashx',
	'BlogRssFeed.ashx',
	'Bin/Composite.Community.Blog.dll',
	'Bin/CookComputing.XmlRpcV2.dll',
	'BlogMetaWeblog.ashx',
	'App_Data/Razor/Composite/Community/Blog/',
	'App_GlobalResources/Composite.Community.Blog/',
	'Composite/InstalledPackages/content/forms/Composite.Community.Blog/',
	'Composite/InstalledPackages/controls/FormsControls/Composite.Community.Blog/',
	'Frontend/Composite/Community/Blog/',
	'App_GlobalResources/Composite/Community/Blog.resx',
	'App_GlobalResources/Composite/Community/Blog.ru-ru.resx',
	'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.xml',
	'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Entries.xml',
	'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xml',
	'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xmll',
	'App_Data/Composite/DynamicTypeForms/Composite/Community/Blog/Authors.xml',
	'App_Data/Composite/DynamicTypeForms/Composite/Community/Blog/Entries.xml',
	'App_Data/Search/',
	'Bin/CompositeC1Contrib.RazorFunctions.dll',
	'Bin/Microsoft.Web.*.dll',
	'Bin/Composite.Community.Extranet.dll',
	'Bin/Composite.Community.Newsletter.dll',
	'Bin/Composite.Community.Newsletter.SubjectBased.dll',
	'Bin/Composite.Community.Newsletter.DataTypeBased.dll',
	'Bin/Composite.Community.Newsletter.FunctionBased.dll',
	'Bin/Common.Logging*.dll',
	'Bin/BoboBrowse.Net.dll',
	'Bin/C5.dll',
	'Bin/Orckestra.Search*.dll',
	'Newsletter.ashx',
	'App_Data/Composite/TreeDefinitions/Composite.Community.Newsletter.SubjectBased.xml',
	'App_Data/NewsletterType/',
	'App_GlobalResources/Composite/Community/Newsletter.resx',
	'Bin/Composite.Community.EventCalendar.dll',
	'App_Data/Composite/TreeDefinitions/Composite.Community.EventCalendar.EventsApp.xml',
	'App_GlobalResources/Composite/Community/ContactForm.resx',
	'App_GlobalResources/Composite/Community/ContactForm.ru-RU.resx',
	'App_Data/Composite/TreeDefinitions/Composite.Community.ContactForm.xml',
	'App_Data/Composite/TreeDefinitions/Composite.Community.ContactFrom.EmailTemplate.xml',
	'App_Data/Composite/TreeDefinitions/Composite.Community.ContactForm.xml',
	'App_Data/Composite/TreeDefinitions/Composite.Community.ContactFrom.EmailTemplate.xml', 
	'Bin/Composite.Versioning.ContentVersioning.dll',
	'App_Data/Composite/TreeDefinitions/Composite.Versioning.ContentVersioning.xml',
	'Frontend/Composite/C1BaseSite/',
	'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.News.NewsItem.da-dk.xml', 
	'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.News.NewsItem.en-us.xml',
	'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.TeaserSpot.da-dk.xml',
	'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.TeaserSpot.en-us.xml',
	'App_Data/Composite/TreeDefinitions/Composite.TemplateSites.Base01.News.NewsItem.xml', 
	'App_Data/Composite/TreeDefinitions/Composite.TemplateSites.Base01.TeaserSpot.xml',
	'App_Data/Composite/TreeDefinitions/Orckestra.Lists.Tabs.xml',
	'App_Data/Composite/TreeDefinitions/Orckestra.Lists.Portfolio.Application.xml',
	'Frontend/Styles/Print.css',
	'Frontend/Styles/Screen.css',
	'Frontend/Styles/VisualEditor/VisualEditor.Config.css',
	'Frontend/Styles/VisualEditor/VisualEditor.Config.xml',
	'Frontend/Styles/VisualEditor/VisualEditor.Default.css',
	'Frontend/Composite/Search/SimplePageSearch/Styles.css',
	'Composite/content/forms/InstalledPackages/Composite.Tools.PackageCreator/',
	'Bin/Composite.Tools.PackageCreator.dll', 
	'Composite/InstalledPackages/localization/Composite.Tools.PackageCreator.en-us.xml',
	'App_Data/PackageCreator',
	'App_Data/Composite/Configuration\Composite.Forms.FormBuilder.xml',
	'App_Data/Composite/Configuration\Composite.Media.ImageCrop.xml',
	'Frontend/Scripts/',
	'Frontend/Styles/ -- !(VisualEditor.common.css)',
	'Frontend/Images/',
	'Frontend/Composite/',
	'bin/Composite.Generated.dll',
	'ZipTest/'
]
const rimraf = require('rimraf');
const fs = require('fs');
const globals = require(process.cwd()+'/Website/test/e2e/globals');

var basepath = globals.siteLocation || process.cwd()+'/Website';
var sourcepath = process.cwd()+'/Website';

function copyFile(source, target) {
	var id = Math.ceil(10000 * Math.random());
	var tmpFileLoc = basepath + '/tmp' + id;
	return new Promise(function(resolve, reject) {
		var reader = fs.createReadStream(source);
		reader.on('error', reject);
		
		var writer = fs.createWriteStream(tmpFileLoc);
		writer.on('error', reject);
		writer.on('finish', function () { resolve(id); });
		reader.pipe(writer);
	}).then(function (id) {
		fs.renameSync(tmpFileLoc, target);
	});
}
function delay() {
   return new Promise(function(resolve) { 
       setTimeout(resolve, 11000)
   });
}
function deleteWebConfig() {
    return new Promise(
		function (resolve, reject) {
			rimraf(basepath + '/Web.config', {}, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		}
	);
}
module.exports = function reset(callback) {
	console.log('resetting site in '+basepath);
	deleteWebConfig().then(function () {
	  return delay()
	}).then(function () {
	Promise.all([removePaths.map(function (path) {
		var fullpath = basepath + '\\' + path;
		return new Promise(function (resolve, reject) {
			rimraf(fullpath, {}, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	})])} )
	.then(function () {
		return Promise.all([
			copyFile(sourcepath + '/ReleaseBuild.Web.config',
				basepath + '/Web.config'),
			copyFile(sourcepath + '/App_Data/Composite/ReleaseBuild.Composite.config',
				basepath + '/App_Data/Composite/Composite.config')
		]);
	})
	.then(function () {
		callback();
	})
	.catch(function (err) {
		callback(err);
	});
};
