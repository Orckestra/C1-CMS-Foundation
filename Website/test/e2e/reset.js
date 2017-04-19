const removePaths = [
	'Website/App_Data/Composite/Configuration/Composite.Forms.FormBuilder.xml',
	'Website/App_Data/Composite/Configuration/Composite.Media.ImageCrop.xml',
	'Website/App_Data/Composite/Configuration/DynamicXmlDataProvider.config',
	'Website/App_Data/Composite/Configuration/FirstTimeStart.xml',
	'Website/App_Data/Composite/Configuration/InstallationInformation.xml',
	'Website/App_Data/Composite/Configuration/SystemInitialized.xml',
	'Website/App_Data/Composite/DataMetaData/',
	'Website/App_Data/Composite/DataStores/',
	'Website/App_Data/Composite/DynamicTypeForms/*',
	'Website/App_Data/Composite/InlineCSharpFunctions/',
	'Website/App_Data/Composite/PackageLicenses/',
	'Website/App_Data/Composite/Packages/',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Entries.xml',
	'Website/App_Data/Composite/TreeDefinitions/Composite.Community.Blog.Settings.xml',
	'Website/App_Data/Media/',
	'Website/App_Data/PageTemplateFeatures/',
	'Website/App_Data/PageTemplates/*.cshtml',
	'Website/App_Data/Razor/Composite/',
	'Website/App_Data/Razor/Orckestra/',
	'Website/App_Data/Razor/Layout/',
	'Website/App_Data/Razor/PageBlocks/',
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
	'Website/bin/Composite.Community.Blog.dll',
	'Website/bin/Composite.Forms.FormBuilder.dll',
	'Website/bin/Composite.Forms.Renderer.dll',
	'Website/bin/Composite.Generated.dll',
	'Website/bin/Composite.Media.ImageCrop.dll',
	'Website/bin/Composite.Search.SimplePageSearch.dll',
	'Website/bin/Composite.Tools.LinkChecker.dll',
	'Website/bin/Composite.Web.BundlingAndMinification.dll',
	'Website/bin/Composite.Web.Css.Less.dll',
	'Website/bin/CookComputing.XmlRpcV2.dll',
	'Website/bin/ICSharpCode.SharpZipLib.dll',
	'Website/bin/System.Web.Optimization.dll',
	'Website/bin/WebGrease.dll'
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

module.exports = function reset(callback) {
	Promise.all(removePaths.map(function (path) {
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
	}))
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
