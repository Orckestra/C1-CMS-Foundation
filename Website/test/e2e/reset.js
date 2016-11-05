
const backupPaths = [
    'App_Data',
    'bin',
    'Composite',
    'Frontend',
    'Renderers'
]

const ignoredPaths = [

    'bower_components',
    'obj',
    'node_modules',
    'Properties',
	'test'
	
]


const fs = require('fs');
const robocopy = require('robocopy');

const basepath = process.cwd();

module.exports = function reset() {
	
	// the backup exists
	if(fs.existsSync(basepath + '\\_backups'))
	{
		/*
		// copy ignoredPaths to /_ignored, mirroring
		if(!fs.existsSync(basepath + '\\_ignored'))
		{
			fs.mkdir(basepath + '\\_ignored');
		}
		*/
		
		var count = ignoredPaths.length;
		
		for(var i = 0; i < count; i++)
		{
			robocopy ({
				source: basepath + '\\Website\\' + ignoredPaths[i],
				destination: basepath + '\\_backups\\' + ignoredPaths[i],
				subdirs: true,
				copy:{
					mirror: true
				}
			});			
		}		
		

		// restore the /Website from /_backups, mirroring
		
		// except for the folder where the server is running
		robocopy ({
				source: basepath + '\\_backups\\',
				destination: basepath + '\\Website\\',
				subdirs: true,
				copy:{
					mirror: true
				},
				file:{
					excludeDirs: [
						basepath + '\\Website\\test',
						basepath + '\\_backups\\test',
						basepath + '\\Website\\bower_components',
						basepath + '\\_backups\\bower_components',
						basepath + '\\Website\\node_modules',
						basepath + '\\_backups\\node_modules'
						]
				}
				
			});		
	}
	
	// the backup doesn't exist
	else
	{
		// 1 create the backup folder:
		fs.mkdir(basepath + '\\_backups');
		
		var count = backupPaths.length;
		
		// 2 - copy backupPaths to /_backups		
		for(var i = 0; i < count; i++)
		{
			robocopy ({
				source: basepath + '\\Website\\' + backupPaths[i],
				destination: basepath + '\\_backups\\' + backupPaths[i],
				subdirs: true,
				copy:{
					mirror: true
				}
			});			
		}
				
		// 3 - copy /Website/*.* to /_backups, no subdirs
		robocopy ({
			source: basepath + '\\Website',
			destination: basepath + '\\_backups',
			subdirs: false
		});	
	}
};
