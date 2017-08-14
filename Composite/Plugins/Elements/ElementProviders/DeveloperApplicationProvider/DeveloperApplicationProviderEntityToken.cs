using System.IO;
using Composite.C1Console.Security;
using Composite.C1Console.Security.SecurityAncestorProviders;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Newtonsoft.Json;


namespace Composite.Plugins.Elements.ElementProviders.DeveloperApplicationProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(NoAncestorSecurityAncestorProvider))]
    public sealed class DeveloperApplicationProviderEntityToken : EntityToken
    {        
        private string _id;
        private string _source;


        /// <exclude />
        public const string TreeRootFolderId = "TreeFolder";

        /// <exclude />
        public const string TreeDefinitionId = "TreeDefinition";


        /// <exclude />
        public DeveloperApplicationProviderEntityToken(string id)
            :this(id, "")
        {                        
        }


        /// <exclude />
        public DeveloperApplicationProviderEntityToken(string id, string source)
        {
            _id = id;
            _source = source;
        }


        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }



        /// <exclude />
        public override string Source
        {
            get { return _source; }
        }



        /// <exclude />
        public override string Id
        {
            get { return _id; }
        }



        /// <exclude />
        [JsonIgnore]
        public string Filename
        {
            get { return this.Source; }
        }


        /// <exclude />
        [JsonIgnore]
        public string FullTreePath
        {
            get
            {                
                return Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), this.Filename);
            }
        }


        /// <exclude />
        public override string Serialize()
        {
            return DoSerialize();
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedEntityToken)
        {
            string type, source, id;
            
            DoDeserialize(serializedEntityToken, out type, out source, out id);

            return new DeveloperApplicationProviderEntityToken(id, source);
        }
    }
}
