using System;
using System.CodeDom;
using System.Diagnostics;
using System.Collections.Generic;


namespace Composite.Types
{
    [DebuggerDisplay("{Fullname}, IsCompiled = {IsCompiled}")]
    public sealed class BuildManagerCompileType
    {
        private KeyValuePair<string, Func<CodeTypeDeclaration>> _codeTypeDeclarationFunc;
        private WeakReference _codeTypeDeclaration;
        private string _fullname = null;

        public BuildManagerCompileType(string codeNamespaceName, KeyValuePair<string, Func<CodeTypeDeclaration>> codeTypeDeclarationFunc)
        {
            if (string.IsNullOrEmpty(codeNamespaceName) == true) throw new ArgumentNullException("codeNamespaceName");
            if (string.IsNullOrEmpty(codeTypeDeclarationFunc.Key) == true) throw new ArgumentNullException("codeTypeDeclarationFunc");
            if (codeTypeDeclarationFunc.Value == null) throw new ArgumentNullException("codeTypeDeclarationFunc");

            this.CodeNamespaceName = codeNamespaceName;
            _codeTypeDeclarationFunc = codeTypeDeclarationFunc;
        }



        internal BuildManagerCompileType(Type resultType)
        {
            this.ResultType = resultType;
        }



        public string CodeNamespaceName { get; private set; }
        
        
        public CodeTypeDeclaration CodeTypeDeclaration 
        {
            get
            {
                if(_codeTypeDeclaration != null)
                {
                    var precalculatedValue = _codeTypeDeclaration.Target as CodeTypeDeclaration;
                    if (precalculatedValue != null)
                    {
                        return precalculatedValue;
                    }
                }

                lock(this)
                {
                    if (_codeTypeDeclaration != null)
                    {
                        var precalculatedValue = _codeTypeDeclaration.Target as CodeTypeDeclaration;
                        if (precalculatedValue != null)
                        {
                            return precalculatedValue;
                        }
                    }

                    CodeTypeDeclaration result = _codeTypeDeclarationFunc.Value();

                    _codeTypeDeclaration = new WeakReference(result);

                    return result;
                }
            }
        }


        public Type ResultType { get; internal set; }


        public string Namespace
        {
            get
            {
                if (this.CodeNamespaceName != null)
                {
                    return this.CodeNamespaceName;
                }
                else
                {
                    return this.ResultType.Namespace;
                }
            }
        }



        public string Name
        {
            get
            {
                if (this.ResultType != null)
                {
                    return this.ResultType.Name;
                }
                else
                {
                    return _codeTypeDeclarationFunc.Key;
                }
            }
        }



        public string Fullname
        {
            get
            {
                if (_fullname == null)
                {
                    _fullname = string.Format("{0}.{1}", this.Namespace, this.Name);
                }

                return _fullname;
            }
        }



        public bool IsCompiled
        {
            get
            {
                return this.ResultType != null;
            }
        }



        public override bool Equals(object obj)
        {
            return Equals(obj as BuildManagerCompileType);
        }



        public bool Equals(BuildManagerCompileType buildManagerCompileType)
        {
            if (buildManagerCompileType == null) return false;

            return this.Namespace == buildManagerCompileType.Namespace && this.Name == buildManagerCompileType.Name;
        }



        public override int GetHashCode()
        {
            return this.Namespace.GetHashCode() ^ this.Name.GetHashCode();
        }



        public override string ToString()
        {
            return this.Fullname;
        }
    }
}
