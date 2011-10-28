using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using Composite.Core.Collections.Generic;


namespace Composite.Core.Types
{
#warning MRJ: BM: Kill this class and all its friends
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Id = {Id}")]
    public sealed class BuildManagerCompileUnit
    {
        private bool? _isCacheble;
        private readonly List<BuildManagerCompileType> _buildManagerCompileTypes = new List<BuildManagerCompileType>();
        private readonly Hashtable<string, BuildManagerCompileType> _compiledTypeByName = new Hashtable<string, BuildManagerCompileType>();
        private readonly Hashtable<string, BuildManagerCompileType> _compiledTypeByFullName = new Hashtable<string, BuildManagerCompileType>();

        private List<Assembly> _referencedAssemblies = new List<Assembly>();
        private List<Type> _usedTypes = new List<Type>();


        /// <exclude />
        public BuildManagerCompileUnit(string id, string fingerprint)
        {
            this.Id = id;
            this.HashedId = this.Id.GetHashCode();
            this.Fingerprint = fingerprint;
            this.AllowSiloing = true;
        }


        /// <exclude />
        public string Id { get; private set; }

        /// <exclude />
        public int HashedId { get; private set; }

        /// <exclude />
        public string Fingerprint { get; private set; }

        internal bool AllowSiloing { get; set; }

        /// <summary>
        /// If set to true it's poosible to reference generated interfaces in Composite.Generated and other dll-s at the same time.
        /// </summary>
        public bool AllowCrossReferences { get; set; }


        /// <exclude />
        public bool IsCacheble
        {
            get
            {
                if (_isCacheble.HasValue == false)
                {
                    return string.IsNullOrEmpty(this.Fingerprint) != true;
                }
                else
                {
                    return _isCacheble.Value;
                }
            }
            set
            {
                _isCacheble = value;
            }
        }



        /// <exclude />
        public IEnumerable<BuildManagerCompileType> Types
        {
            get
            {
                return _buildManagerCompileTypes; 
            }
        }



        /// <exclude />
        public Type GetGeneretedTypeByName(string name)
        {
            Type type = TryGetGeneretedTypeByName(name);

            if (type == null) throw new ArgumentException(string.Format("The type named {0} was not generated", name));

            return type;
        }



        /// <exclude />
        public Type TryGetGeneretedTypeByName(string name)
        {
            BuildManagerCompileType buildManagerCompileType = _compiledTypeByName[name];

            if (buildManagerCompileType == null) return null;

            return buildManagerCompileType.ResultType;
        }



        /// <exclude />
        public Type GetGeneretedTypeByFullName(string fullname)
        {
            Type type = TryGetGeneretedTypeByFullName(fullname);

            if (type == null) throw new ArgumentException(string.Format("The type named {0} was not generated", fullname));

            return type;
        }



        /// <exclude />
        public Type TryGetGeneretedTypeByFullName(string fullname)
        {

            BuildManagerCompileType buildManagerCompileType = _compiledTypeByFullName[fullname];

            if (buildManagerCompileType == null) return null;

            return buildManagerCompileType.ResultType;
        }



        /// <exclude />
        public void AddType(BuildManagerCompileType buildManagerCompileType)
        {
            if (buildManagerCompileType == null) throw new ArgumentNullException("buildManagerCompileType");

            _buildManagerCompileTypes.Add(buildManagerCompileType);
            _compiledTypeByName[buildManagerCompileType.Name] = buildManagerCompileType;
            _compiledTypeByFullName.Add(buildManagerCompileType.Fullname, buildManagerCompileType);
        }



        /// <exclude />
        public void AddType(string codeNamespaceName, KeyValuePair<string, Func<CodeTypeDeclaration>> codeTypeDeclarationFunc)
        {
            AddType(new BuildManagerCompileType(codeNamespaceName, codeTypeDeclarationFunc));
        }



        /// <exclude />
        public void AddTypes(string codeNamespaceName, IEnumerable<KeyValuePair<string, Func<CodeTypeDeclaration>>> codeTypeDeclarationFuncs)
        {
            foreach (KeyValuePair<string, Func<CodeTypeDeclaration>> codeTypeDeclarationFunc in codeTypeDeclarationFuncs)
            {
                AddType(new BuildManagerCompileType(codeNamespaceName, codeTypeDeclarationFunc));
            }
        }



        /// <exclude />
        public void AddAssemblyReference(Assembly assembly)
        {
            if (_referencedAssemblies.Contains(assembly) == false)
            {
                _referencedAssemblies.Add(assembly);
            }
        }



        internal IEnumerable<Assembly> ReferencedAssemblies
        {
            get
            {
                return _referencedAssemblies;
            }
        }



        internal int AssemblyVersion
        {
            get;
            set;
        }



        internal void ExtractTypes(Assembly assembly)
        {
            var types = new Hashtable<string, Type>();

            foreach(Type type in assembly.GetTypes())
            {
                types.Add(type.FullName, type);
            }

            foreach (BuildManagerCompileType buildManagerCompileType in this.Types)
            {
                buildManagerCompileType.ResultType = types[buildManagerCompileType.Fullname];
            }
        }



        /// <exclude />
        public void RegisterUsedType(Type generatedType)
        {
            _usedTypes.Add(generatedType);
        }



        internal List<Type> UsedTypes
        {
            get { return _usedTypes; }
        }


        internal void CopyResultsFrom(BuildManagerCompileUnit buildManagerCompileUnit)
        {
            var table = new Hashtable<BuildManagerCompileType, BuildManagerCompileType>();
            foreach (var buildManagerCompileType in buildManagerCompileUnit._buildManagerCompileTypes)
            {
                table.Add(buildManagerCompileType, buildManagerCompileType);
            }

            foreach (BuildManagerCompileType buildManagerCompileType in _buildManagerCompileTypes)
            {
                Verify.That(table.ContainsKey(buildManagerCompileType), "Failed to find a type in a compiling unit.");

                buildManagerCompileType.ResultType = table[buildManagerCompileType].ResultType;
            }
        }
    }
}
