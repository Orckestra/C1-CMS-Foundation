const removePaths = [
    'App_Code/*',
    'App_Data/Components/',
    'App_Data/Composite/ApplicationState/',
    'App_Data/Composite/Azure/',
    'App_Data/Composite/Cache/',
    'App_Data/Composite/Cache/Assemblies/*',
    'App_Data/Composite/Composite.config',
    'App_Data/Composite/Configuration/Composite.Forms.FormBuilder.xml',
    'App_Data/Composite/Configuration/Composite.Media.ImageCrop.xml',
    'App_Data/Composite/Configuration/DynamicSqlDataProvider.config',
    'App_Data/Composite/Configuration/DynamicXmlDataProvider.config',
    'App_Data/Composite/Configuration/FirstTimeStart.xml',
    'App_Data/Composite/Configuration/InstallationInformation.xml',
    'App_Data/Composite/Configuration/SystemInitialized.xml',
    'App_Data/Composite/Configuration\Composite.Forms.FormBuilder.xml',
    'App_Data/Composite/Configuration\Composite.Media.ImageCrop.xml',
    'App_Data/Composite/DataMetaData/',
    'App_Data/Composite/DataStores/',
    'App_Data/Composite/DynamicTypeForms/*',
    'App_Data/Composite/DynamicTypeForms/Composite/Community/Blog/Authors.xml',
    'App_Data/Composite/DynamicTypeForms/Composite/Community/Blog/Entries.xml',
    'App_Data/Composite/InlineCSharpFunctions/',
    'App_Data/Composite/LanguagePacks/',
    'App_Data/Composite/LogFiles/*',
    'App_Data/Composite/PackageLicenses/',
    'App_Data/Composite/Packages/*',
    'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Entries.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xmll',
    'App_Data/Composite/TreeDefinitions/Composite.Community.Blog.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.ContactForm.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.ContactFrom.EmailTemplate.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.ContactFrom.EmailTemplate.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.EventCalendar.EventsApp.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Community.Newsletter.SubjectBased.xml',
    'App_Data/Composite/TreeDefinitions/Composite.TemplateSites.Base01.News.NewsItem.xml',
    'App_Data/Composite/TreeDefinitions/Composite.TemplateSites.Base01.TeaserSpot.xml',
    'App_Data/Composite/TreeDefinitions/Composite.Versioning.ContentVersioning.xml',
    'App_Data/Composite/TreeDefinitions/Orckestra.Lists.Portfolio.Application.xml',
    'App_Data/Composite/TreeDefinitions/Orckestra.Lists.Tabs.xml',
    'App_Data/Media/*',
    'App_Data/NewsletterType/',
    'App_Data/PackageCreator',
    'App_Data/PageTemplateFeatures/',
    'App_Data/PageTemplates/*.cshtml',
    'App_Data/PageTemplates/*.master*',
    'App_Data/Razor/ -- !(web.config) ',
    'App_Data/Razor/Composite/',
    'App_Data/Razor/Composite/Community/Blog/',
    'App_Data/Razor/Content/',
    'App_Data/Razor/Layout/',
    'App_Data/Razor/Orckestra/',
    'App_Data/Razor/PageBlocks/',
    'App_Data/Razor/Widgets/',
    'App_Data/Search/',
    'App_Data/UserControls/ -- !(web.config)',
    'App_Data/Xslt/*',
    'App_GlobalResources/',
    'App_GlobalResources/Composite.Community.Blog/',
    'App_GlobalResources/Composite/Community/Blog.resx',
    'App_GlobalResources/Composite/Community/Blog.ru-ru.resx',
    'App_GlobalResources/Composite/Community/ContactForm.resx',
    'App_GlobalResources/Composite/Community/ContactForm.ru-RU.resx',
    'App_GlobalResources/Composite/Community/Newsletter.resx',
    'bin/Antlr3.Runtime.dll',
    'bin/BoboBrowse.Net.dll',
    'bin/C5.dll',
    'bin/Common.Logging*.dll',
    'bin/Composite.Community.*.*',
    'bin/Composite.Community.Blog.dll',
    'bin/Composite.Community.EventCalendar.dll',
    'bin/Composite.Community.Extranet.dll',
    'bin/Composite.Community.Newsletter.DataTypeBased.dll',
    'bin/Composite.Community.Newsletter.dll',
    'bin/Composite.Community.Newsletter.FunctionBased.dll',
    'bin/Composite.Community.Newsletter.SubjectBased.dll',
    'bin/Composite.Forms.FormBuilder.dll',
    'bin/Composite.Forms.Renderer.dll',
    'bin/Composite.Generated.dll',
    'bin/Composite.Media.*.*',
    'bin/Composite.Search.SimplePageSearch.dll',
    'bin/Composite.Tools.*.*',
    'bin/Composite.Tools.PackageCreator.dll',
    'bin/Composite.Versioning.ContentVersioning.dll',
    'bin/Composite.Web.*.*',
    'bin/Composite.XmlSerializers.dll',
    'bin/CompositeC1Contrib.RazorFunctions.dll',
    'bin/CookComputing.XmlRpcV2.dll',
    'bin/CookComputing.XmlRpcV2.dll',
    'bin/ICSharpCode.SharpZipLib.dll',
    'bin/Lucene.Net.dll',
    'bin/Lucene.Net.*.dll',
//    'bin/Microsoft.Web.*.dll',
    'bin/Microsoft.WindowsAzure.*.dll',
    'bin/Orckestra.Search*.dll',
    'bin/Orckestra.Web.Css.Less.dll',
    'bin/System.Web.Optimization.dll',
    'bin/WebGrease.dll',
    'BlogCommentsRssFeed.ashx',
    'BlogMetaWeblog.ashx',
    'BlogRssFeed.ashx',
    'Composite/content/forms/InstalledPackages/Composite.Tools.PackageCreator/',
    'Composite/InstalledPackages/',
    'Composite/InstalledPackages/content/forms/Composite.Community.Blog/',
    'Composite/InstalledPackages/controls/FormsControls/Composite.Community.Blog/',
    'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.News.NewsItem.da-dk.xml',
    'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.News.NewsItem.en-us.xml',
    'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.TeaserSpot.da-dk.xml',
    'Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.TeaserSpot.en-us.xml',
    'Composite/InstalledPackages/localization/Composite.Tools.PackageCreator.en-us.xml',
    'Frontend/Composite/',
    'Frontend/Composite/C1BaseSite/',
    'Frontend/Composite/Community/Blog/',
    'Frontend/Composite/Search/SimplePageSearch/Styles.css',
    'Frontend/fonts/',
    'Frontend/Images/',
    'Frontend/Images/*',
    'Frontend/Orckestra/',
    'Frontend/Scripts/',
    'Frontend/Scripts/*',
    'Frontend/Styles/ -- !(VisualEditor.common.css)',
    'Frontend/Styles/bootstrap',
    'Frontend/Styles/font-awesome',
    'Frontend/Styles/includes',
    'Frontend/Styles/PageBlocks',
    'Frontend/Styles/Print.css',
    'Frontend/Styles/Screen.css',
    'Frontend/Styles/style.less',
    'Frontend/Styles/style.min.css',
    'Frontend/Styles/VisualEditor.common.less',
    'Frontend/Styles/VisualEditor.less',
    'Frontend/Styles/VisualEditor/VisualEditor.Config.css',
    'Frontend/Styles/VisualEditor/VisualEditor.Config.xml',
    'Frontend/Styles/VisualEditor/VisualEditor.Default.css',
    'Newsletter.ashx',
    'Web.config',
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
