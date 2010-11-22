using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using Composite.Core.IO.Plugins.IOProvider;
using Composite.Core.IO;

namespace Composite.Core.Implementation
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1ConfigurationImplementation
    {
        private IC1Configuration _configuration;

        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public C1ConfigurationImplementation(string path)
        {

            _configuration = IOFacade.CreateC1Configuration(path);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual string FilePath
        {
            get
            {
                return _configuration.FilePath;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual bool HasFile
        {
            get
            {
                return _configuration.HasFile;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual AppSettingsSection AppSettings
        {
            get
            {
                return _configuration.AppSettings;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual ConnectionStringsSection ConnectionStrings
        {
            get
            {
                return _configuration.ConnectionStrings;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual ConfigurationSectionCollection Sections
        {
            get
            {
                return _configuration.Sections;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual ConfigurationSectionGroup RootSectionGroup
        {
            get
            {
                return _configuration.RootSectionGroup;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual ConfigurationSectionGroupCollection SectionGroups
        {
            get
            {
                return _configuration.SectionGroups;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sectionName"></param>
        /// <returns></returns>
        public virtual ConfigurationSection GetSection(string sectionName)
        {
            return _configuration.GetSection(sectionName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sectionGroupName"></param>
        /// <returns></returns>
        public virtual ConfigurationSectionGroup GetSectionGroup(string sectionGroupName)
        {
            return _configuration.GetSectionGroup(sectionGroupName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public virtual void Save()
        {
            _configuration.Save();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="saveMode"></param>
        public virtual void Save(ConfigurationSaveMode saveMode)
        {
            _configuration.Save(saveMode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        public virtual void Save(ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.Save(saveMode, forceSaveAll);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        public virtual void SaveAs(string filename)
        {
            _configuration.SaveAs(filename);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="saveMode"></param>
        public virtual void SaveAs(string filename, ConfigurationSaveMode saveMode)
        {
            _configuration.SaveAs(filename, saveMode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        public virtual void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            _configuration.SaveAs(filename, saveMode, forceSaveAll);
        }
    }
}
