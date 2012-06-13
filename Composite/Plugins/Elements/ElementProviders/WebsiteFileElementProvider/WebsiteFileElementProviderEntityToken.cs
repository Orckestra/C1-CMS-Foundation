using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.Serialization;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [SecurityAncestorProvider(typeof(WebsiteFileProviderEntityTokenSecurityAncestorProvider))]
    public sealed class WebsiteFileElementProviderEntityToken : EntityToken
    {
        private string _providerName;

        /// <exclude />
        public WebsiteFileElementProviderEntityToken(string providerName, string path, string rootPath)
        {
            // Normalizing directory name
            if(rootPath.EndsWith("\\"))
            {
                rootPath = rootPath.Substring(0, rootPath.Length - 1);
            }

            this.Path = path;
            this.RootPath = rootPath;
            _providerName = providerName;
        }


        /// <exclude />
        public string ProviderName
        {
            get { return _providerName; }
        }


        /// <exclude />
        public override string Type
        {
            get { return ""; }
        }


        /// <exclude />
        public override string Source
        {
            get { return _providerName; }
        }


        /// <exclude />
        public override string Id
        {
            get { return this.Path; }
        }


        /// <exclude />
        public override string Serialize()
        {
            // TODO: serialization & desealization to use relative paths
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "RootPath", this.RootPath);
             
            return sb.ToString();
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            // TODO: serialization & desealization to use relative paths
            Dictionary<string, string> dic;
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id, out dic);

            string rootPath = StringConversionServices.DeserializeValueString(dic["RootPath"]);

            return new WebsiteFileElementProviderEntityToken(source, id, rootPath);
        }


        /// <exclude />
        public string Path
        {
            get;
            private set;
        }


        internal string RootPath
        {
            get;
            private set;
        }


        internal bool IsRoot
        {
            get { return this.Path == this.RootPath; }
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            EntityToken entityToken = obj as WebsiteFileElementProviderEntityToken;

            if (entityToken == null) return false;

            return Equals(entityToken);
        }


        /// <exclude />
        public bool Equals(WebsiteFileElementProviderEntityToken entityToken)
        {
            if (entityToken.GetHashCode() != GetHashCode()) return false;

            return entityToken.Type == this.Type &&
                   entityToken.Source == this.Source &&
                   entityToken.Id == this.Id &&
                   entityToken.Path == this.Path &&
                   entityToken.RootPath == this.RootPath;
        }


        /// <exclude />
        public override int GetHashCode()
        {
            if (this.HashCode == 0)
            {
                this.HashCode = GetType().GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode() ^ this.Path.GetHashCode() ^ this.RootPath.GetHashCode();
            }
            return this.HashCode;
        }
    }
}
