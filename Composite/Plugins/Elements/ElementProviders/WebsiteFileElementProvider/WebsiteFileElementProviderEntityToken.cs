using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Security;
using Composite.Core.IO;
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
        private static readonly string _baseDirectory;
        private readonly string _providerName;
        private readonly string _relativePath;

        static WebsiteFileElementProviderEntityToken()
        {
            string baseDirectory = PathUtil.BaseDirectory;
            if(baseDirectory.EndsWith("\\"))
            {
                baseDirectory = baseDirectory.Substring(0, baseDirectory.Length - 1);
            }

            _baseDirectory = baseDirectory;
        }

        /// <exclude />
        public WebsiteFileElementProviderEntityToken(string providerName, string path, string rootPath)
        {
            Verify.ArgumentNotNull(path, "path");
            Verify.ArgumentNotNull(rootPath, "rootPath");
            Verify.ArgumentCondition(path.StartsWith(rootPath, StringComparison.OrdinalIgnoreCase), "path", "Path should start with root path");

            Verify.That(rootPath.StartsWith(_baseDirectory, StringComparison.OrdinalIgnoreCase), "Path does not belong to the website");

            _relativePath = path.Substring(_baseDirectory.Length);

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
            get { return _relativePath; }
        }


        /// <exclude />
        public override string Serialize()
        {
            StringBuilder sb = new StringBuilder();

            DoSerialize(sb);

            StringConversionServices.SerializeKeyValuePair(sb, "root", RelativeRootPath);
             
            return sb.ToString();
        }


        /// <exclude />
        public static EntityToken Deserialize(string serializedData)
        {
            Dictionary<string, string> dic;
            string type, source, id;

            EntityToken.DoDeserialize(serializedData, out type, out source, out id, out dic);

            // Backward compatibility
            if(dic.ContainsKey("RootPath"))
            {
                string rootPath = StringConversionServices.DeserializeValueString(dic["RootPath"]);

                return new WebsiteFileElementProviderEntityToken(source, id, rootPath);
            }
            
            string relativeRootPath = StringConversionServices.DeserializeValueString(dic["root"]);

            return new WebsiteFileElementProviderEntityToken(source, _baseDirectory + id, _baseDirectory + relativeRootPath);
        }


        /// <exclude />
        public string Path
        {
            get;
            private set;
        }

        private string RelativeRootPath
        {
            get { return RootPath.Substring(_baseDirectory.Length); }
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
                this.HashCode = GetType().GetHashCode() ^ this.Type.GetHashCode() ^ this.Source.GetHashCode() ^ this.Id.GetHashCode() ^ this.RelativeRootPath.GetHashCode();
            }
            return this.HashCode;
        }
    }
}
