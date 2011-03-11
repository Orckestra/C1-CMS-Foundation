using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using Composite.Core.IO;
using Composite.Core.IO.Plugins.IOProvider;


namespace Composite.Core.Implementation
{
    /// <summary>
    /// Implementation of <see cref="Composite.Core.Configuration.C1Configuration"/>.
    /// </summary>
    public class C1ConfigurationImplementation
    {
        private IC1Configuration _configuration;

        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public C1ConfigurationImplementation(string path)
        {

            _configuration = IOFacade.CreateC1Configuration(path);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual string FilePath
        {
            get
            {
                return _configuration.FilePath;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual bool HasFile
        {
            get
            {
                return _configuration.HasFile;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual AppSettingsSection AppSettings
        {
            get
            {
                return _configuration.AppSettings;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual ConnectionStringsSection ConnectionStrings
        {
            get
            {
                return _configuration.ConnectionStrings;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual ConfigurationSectionCollection Sections
        {
            get
            {
                return _configuration.Sections;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual ConfigurationSectionGroup RootSectionGroup
        {
            get
            {
                return _configuration.RootSectionGroup;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual ConfigurationSectionGroupCollection SectionGroups
        {
            get
            {
                return _configuration.SectionGroups;
            }
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="sectionName"></param>
        /// <returns></returns>
        public virtual ConfigurationSection GetSection(string sectionName)
        {
            return _configuration.GetSection(sectionName);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="sectionGroupName"></param>
        /// <returns></returns>
        public virtual ConfigurationSectionGroup GetSectionGroup(string sectionGroupName)
        {
            return _configuration.GetSectionGroup(sectionGroupName);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        public virtual void Save()
        {
            _configuration.Save();
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="saveMode"></param>
        public virtual void Save(ConfigurationSaveMode saveMode)
        {
            _configuration.Save(saveMode);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        public virtual void Save(ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.Save(saveMode, forceSaveAll);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="fileName"></param>
        public virtual void SaveAs(string fileName)
        {
            _configuration.SaveAs(fileName);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="saveMode"></param>
        public virtual void SaveAs(string fileName, ConfigurationSaveMode saveMode)
        {
            _configuration.SaveAs(fileName, saveMode);
        }



        /// <summary>
        /// See <see cref="Composite.Core.Configuration.C1Configuration"/>.
        /// </summary>
        /// <param name="fileName"></param>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        public virtual void SaveAs(string fileName, ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.SaveAs(fileName, saveMode, forceSaveAll);
        }
    }
}
