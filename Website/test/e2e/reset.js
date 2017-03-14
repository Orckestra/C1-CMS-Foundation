const removePaths = [
	'Website/App_Data/Composite/Configuration/Composite.Forms.FormBuilder.xml',
	'Website/App_Data/Composite/Configuration/Composite.Media.ImageCrop.xml',
	'Website/App_Data/Composite/Configuration/DynamicXmlDataProvider.config',
	'Website/App_Data/Composite/Configuration/DynamicSqlDataProvider.config',
	'Website/App_Data/Composite/Configuration/FirstTimeStart.xml',
	'Website/App_Data/Composite/Configuration/InstallationInformation.xml',
	'Website/App_Data/Composite/Configuration/SystemInitialized.xml',
	'Website/App_Data/Composite/DataMetaData/',
	'Website/App_Data/Composite/DataStores/',
	'Website/App_Data/Composite/DynamicTypeForms/*',
	'Website/App_Data/Composite/InlineCSharpFunctions/',
	'Website/App_Data/Composite/LanguagePacks/',
	'Website/App_Data/Composite/PackageLicenses/',
	'Website/App_Data/Composite/Azure/',
	'Website/App_Data/Composite/Packages/*',
	'Website/App_Data/Media/*',
	'Website/App_Data/PageTemplateFeatures/',
	'Website/App_Data/PageTemplates/*.cshtml',
	'Website/App_Data/PageTemplates/*.master*',
	'Website/App_Data/Razor/Composite/',
	'Website/App_Data/Razor/Orckestra/',
	'Website/App_Data/Razor/Layout/',
	'Website/App_Data/Razor/PageBlocks/',
	'Website/App_Data/Razor/Widgets/',
	'Website/App_Data/Razor/Content/',
	'Website/App_Data/Razor/ -- !(web.config) ',
	'Website/App_Data/Components/',
	'Website/App_GlobalResources/',
	'Website/BlogMetaWeblog.ashx',
	'Website/BlogRssFeed.ashx',
	'Website/Composite/InstalledPackages/',
	'Website/Frontend/Composite/',
	'Website/Frontend/Orckestra/',
	'Website/Frontend/Images/*',
	'Website/Frontend/Scripts/*',
	'Website/Frontend/Styles/VisualEditor.less',
	'Website/Frontend/Styles/style.less',
	'Website/Frontend/Styles/style.min.css',
	'Website/Frontend/Styles/bootstrap',
	'Website/Frontend/Styles/font-awesome',
	'Website/Frontend/Styles/includes',
	'Website/Frontend/Styles/PageBlocks',
	'Website/Frontend/Styles/style.less',
	'Website/Frontend/Styles/style.min.css',
	'Website/Frontend/Styles/VisualEditor.common.less',
	'Website/Frontend/Styles/VisualEditor.less',
	'Website/Frontend/fonts/',
	'Website/bin/Antlr3.Runtime.dll',
	'Website/bin/Composite.Community.*.*',
	'Website/bin/Composite.Forms.FormBuilder.dll',
	'Website/bin/Composite.Forms.Renderer.dll',
	'Website/bin/Composite.Media.*.*',
	'Website/bin/Composite.Search.SimplePageSearch.dll',
	'Website/bin/Composite.XmlSerializers.dll',
	'Website/bin/Composite.Tools.*.*',
	'Website/bin/Composite.Web.*.*',
	'Website/bin/Orckestra.Web.Css.Less.dll',
	'Website/bin/CookComputing.XmlRpcV2.dll',
	'Website/bin/ICSharpCode.SharpZipLib.dll',
	'Website/bin/System.Web.Optimization.dll',
	'Website/bin/WebGrease.dll',
	'Website/Frontend/Composite/',
	'Website/App_Data/UserControls/ -- !(web.config)',
	'Website/App_Data/PageTemplateFeatures/',
	'Website/Web.config',
	'Website/App_Data/Composite/Composite.config',
	'Website/App_Data/Composite/Cache/Assemblies/*',
	'Website/App_Data/Composite/Cache/',
	//'Website/App_Data/Composite/Cache/ResourceCache/*',
	'Website/App_Data/Xslt/*',
	'Website/App_Data/Composite/LogFiles/*',
	'Website/App_Code/*',
	'Website/App_Data/Composite/ApplicationState/',
	//'Website/App_Data/Composite/ApplicationState/SerializedWorkflows/*',
	'Website/Composite/InstalledPackages/',
	'Website/BlogRssFeed.ashx',
	'Website/BlogCommentsRssFeed.ashx',
	'Website/BlogRssFeed.ashx',
	'Website/Bin/Composite.Community.Blog.dll',
	'Website/Bin/CookComputing.XmlRpcV2.dll',
	'Website/BlogMetaWeblog.ashx',
	'Website/App_Data/Razor/Composite/Community/Blog/',
	'Website/App_GlobalResources/Composite.Community.Blog/',
	'Website/Composite/InstalledPackages/content/forms/Composite.Community.Blog/',
	'Website/Composite/InstalledPackages/controls/FormsControls/Composite.Community.Blog/',
	'Website/Frontend/Composite/Community/Blog/',
	'Website/App_GlobalResources/Composite/Community/Blog.resx',
	'Website/App_GlobalResources/Composite/Community/Blog.ru-ru.resx',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Blog.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Entries.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xmll',
	'Website/App_Data/Composite/DynamicTypeForms/Composite/Community/Blog/Authors.xml',
	'Website/App_Data/Composite/DynamicTypeForms/Composite/Community/Blog/Entries.xml',
	'Website/Bin/CompositeC1Contrib.RazorFunctions.dll',
	'Website/Bin/Microsoft.Web.*.dll',
	'Website/Bin/Composite.Community.Extranet.dll',
	'Website/Bin/Composite.Community.Newsletter.dll',
	'Website/Bin/Composite.Community.Newsletter.SubjectBased.dll',
	'Website/Bin/Composite.Community.Newsletter.DataTypeBased.dll',
	'Website/Bin/Composite.Community.Newsletter.FunctionBased.dll',
	'Website/Newsletter.ashx',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Newsletter.SubjectBased.xml',
	'Website/App_Data/NewsletterType/',
	'Website/App_GlobalResources/Composite/Community/Newsletter.resx',
	'Website/Bin/Composite.Community.EventCalendar.dll',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.EventCalendar.EventsApp.xml',
	'Website/App_GlobalResources/Composite/Community/ContactForm.resx',
	'Website/App_GlobalResources/Composite/Community/ContactForm.ru-RU.resx',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.ContactForm.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.ContactFrom.EmailTemplate.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.ContactForm.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.ContactFrom.EmailTemplate.xml', 
	'Website/Bin/Composite.Versioning.ContentVersioning.dll',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Versioning.ContentVersioning.xml',
	'Website/Frontend/Composite/C1BaseSite/',
	'Website/Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.News.NewsItem.da-dk.xml', 
	'Website/Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.News.NewsItem.en-us.xml',
	'Website/Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.TeaserSpot.da-dk.xml',
	'Website/Composite/InstalledPackages/localization/Composite.TemplateSites.Base01.TeaserSpot.en-us.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.TemplateSites.Base01.News.NewsItem.xml', 
	'Website/App_Data/Composite/TreeDefinitions/Composite.TemplateSites.Base01.TeaserSpot.xml',
	'Website/App_Data/Composite/TreeDefinitions/Orckestra.Lists.Tabs.xml',
	'Website/App_Data/Composite/TreeDefinitions/Orckestra.Lists.Portfolio.Application.xml',
	'Website/Frontend/Styles/Print.css',
	'Website/Frontend/Styles/Screen.css',
	'Website/Frontend/Styles/VisualEditor/VisualEditor.Config.css',
	'Website/Frontend/Styles/VisualEditor/VisualEditor.Config.xml',
	'Website/Frontend/Styles/VisualEditor/VisualEditor.Default.css',
	'Website/Frontend/Composite/Search/SimplePageSearch/Styles.css',
	'Website/Composite/content/forms/InstalledPackages/Composite.Tools.PackageCreator/',
	'Website/Bin/Composite.Tools.PackageCreator.dll', 
	'Website/Composite/InstalledPackages/localization/Composite.Tools.PackageCreator.en-us.xml',
	'Website/App_Data/PackageCreator',
	'Website/App_Data/Composite/Configuration\Composite.Forms.FormBuilder.xml',
	'Website/App_Data/Composite/Configuration\Composite.Media.ImageCrop.xml',
	'Website/Frontend/Scripts/',
	'Website/Frontend/Styles/ -- !(VisualEditor.common.css)',
	'Website/Frontend/Images/',
	'Website/Frontend/Composite/',
	'Website/bin/Composite.Generated.dll',
]
const rimraf = require('rimraf');
const fs = require('fs');

const basepath = process.cwd();

function copyFile(source, target) {
	return new Promise(function(resolve, reject) {
		var reader = fs.createReadStream(source);
		reader.on('error', reject);
		var id = Math.ceil(10000 * Math.random());
		var writer = fs.createWriteStream('tmp' + id);
		writer.on('error', reject);
		writer.on('finish', function () { resolve(id); });
		reader.pipe(writer);
	}).then(function (id) {
		fs.renameSync('tmp' + id, target);
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
			rimraf(basepath + '/Website/Web.config', {}, function (err) {
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
			copyFile(basepath + '/Website/DebugBuild.Web.config',
				basepath + '/Website/Web.config'),
			copyFile(basepath + '/Website/App_Data/Composite/DebugBuild.Composite.config',
				basepath + '/Website/App_Data/Composite/Composite.config')
		]);
	})
	.then(function () {
		callback();
	})
	.catch(function (err) {
		callback(err);
	});
};
