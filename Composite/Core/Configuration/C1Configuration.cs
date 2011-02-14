using System.Configuration;
using Composite.Core.Implementation;


namespace Composite.Core.Configuration
{
    /// <summary>
    /// IOLayer - documentation pending
    /// </summary>
    public class C1Configuration : ImplementationContainer<C1ConfigurationImplementation>
    {
        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="path"></param>
        public C1Configuration(string path)
            : base(() => ImplementationFactory.CurrentFactory.CreateC1Configuration(path))
        {
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public string FilePath
        {
            get
            {
                return this.Implementation.FilePath;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public bool HasFile
        {
            get
            {
                return this.Implementation.HasFile;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public AppSettingsSection AppSettings
        {
            get
            {
                return this.Implementation.AppSettings;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public ConnectionStringsSection ConnectionStrings
        {
            get
            {
                return this.Implementation.ConnectionStrings;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public ConfigurationSectionCollection Sections
        {
            get
            {
                return this.Implementation.Sections;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public ConfigurationSectionGroup RootSectionGroup
        {
            get
            {
                return this.Implementation.RootSectionGroup;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public ConfigurationSectionGroupCollection SectionGroups
        {
            get
            {
                return this.Implementation.SectionGroups;
            }
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sectionName"></param>
        /// <returns></returns>
        public ConfigurationSection GetSection(string sectionName)
        {
            return this.Implementation.GetSection(sectionName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="sectionGroupName"></param>
        /// <returns></returns>
        public ConfigurationSectionGroup GetSectionGroup(string sectionGroupName)
        {
            return this.Implementation.GetSectionGroup(sectionGroupName);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        public void Save()
        {
            this.Implementation.Save();
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="saveMode"></param>
        public void Save(ConfigurationSaveMode saveMode)
        {
            this.Implementation.Save(saveMode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        public void Save(ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            this.Implementation.Save(saveMode, forceSaveAll);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        public void SaveAs(string filename)
        {
            this.Implementation.SaveAs(filename);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="saveMode"></param>
        public void SaveAs(string filename, ConfigurationSaveMode saveMode)
        {
            this.Implementation.SaveAs(filename, saveMode);
        }



        /// <summary>
        /// IOLayer - documentation pending
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="saveMode"></param>
        /// <param name="forceSaveAll"></param>
        public void SaveAs(string filename, ConfigurationSaveMode saveMode, bool forceSaveAll)
        {
            this.Implementation.SaveAs(filename, saveMode, forceSaveAll);
        }
    }
}
