using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.Extensions;

namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseFunctionRuntimeTreeNode : BaseRuntimeTreeNode
    {
        /// <exclude />
        protected List<BaseParameterRuntimeTreeNode> Parameters { get; set; }

        /// <exclude />
        public void SetParameter(BaseParameterRuntimeTreeNode parameterRuntimeTreeNode)
        {
            if (parameterRuntimeTreeNode == null) throw new ArgumentNullException(nameof(parameterRuntimeTreeNode));

            BaseParameterRuntimeTreeNode node = this.Parameters.Find(n => n.Name == parameterRuntimeTreeNode.Name);

            if (node != null)
            {
                this.Parameters.Remove(node);
            }

            this.Parameters.Add(parameterRuntimeTreeNode);
        }



        /// <exclude />
        public void RemoveParameter(string parameterName)
        {
            if (string.IsNullOrEmpty(parameterName)) throw new ArgumentException("parameterName can not be null or an empty string");

            BaseParameterRuntimeTreeNode toRemove = this.Parameters.FirstOrDefault(f => f.Name == parameterName);

            if (toRemove != null)
            {
                this.Parameters.Remove(toRemove);
            }
        }

        /// <summary>
        /// Returns information about parameters that have been set.
        /// </summary>
        public IEnumerable<BaseParameterRuntimeTreeNode> GetSetParameters()
        {
            return this.Parameters;
        }




        /// <exclude />
        public override bool ContainsNestedFunctions
        {
            get
            {
                foreach (var parameter in this.Parameters)
                {
                    if (parameter.GetAllSubFunctionNames().Any())
                    {
                        return true;
                    }
                }

                return false;
            }
        }


        /// <exclude />
        protected abstract IMetaFunction HostedFunction { get; }



        /// <summary>
        /// Returns the composite name of the hosted function
        /// </summary>
        /// <returns></returns>
        public string GetCompositeName()
        {
            return this.HostedFunction.CompositeName();
        }



        /// <summary>
        /// Returns the name (without namespace) of the hosted function
        /// </summary>
        /// <returns></returns>
        public string GetName()
        {
            return this.HostedFunction.Name;
        }



        /// <summary>
        /// Returns the namespace of the hosted function
        /// </summary>
        /// <returns></returns>
        public string GetNamespace()
        {
            return this.HostedFunction.Namespace;
        }



        /// <summary>
        /// Returns the description of the hosted function
        /// </summary>
        /// <returns></returns>
        public string GetDescription()
        {
            return this.HostedFunction.Description;
        }



        /// <exclude />
        protected void ValidateNotSelfCalling()
        {
            var function = HostedFunction;
            if (function is ICompoundFunction compoundFunction && compoundFunction.AllowRecursiveCall)
            {
                return;
            }

            string functionName = GetCompositeName();

            foreach (BaseParameterRuntimeTreeNode parameterRuntimeTreeNode in Parameters)
            {
                if (IsSelfCalling(functionName, parameterRuntimeTreeNode))
                {
                    throw new InvalidOperationException("The function '{0}' is calling itself. A function should implement '{1}' interface in order not to be affected by that limitation."
                        .FormatWith(functionName, typeof(ICompoundFunction).FullName));
                }
            }
        }


        private static bool IsSelfCalling(string functionName, BaseRuntimeTreeNode runtimeTreeNode)
        {            
            if (runtimeTreeNode is FunctionParameterRuntimeTreeNode functionParameterRuntimeTreeNode)
            {
                if (functionParameterRuntimeTreeNode.GetHostedFunction().GetCompositeName() == functionName)
                {
                    return true;
                }

                return IsSelfCalling(functionName, functionParameterRuntimeTreeNode.GetHostedFunction());
            }

            if (runtimeTreeNode is BaseFunctionRuntimeTreeNode functionRuntimeTreeNode)
            {
                if (functionName == functionRuntimeTreeNode.GetCompositeName())
                {
                    return true;
                }

                foreach (BaseParameterRuntimeTreeNode parameterRuntimeTreeNode in functionRuntimeTreeNode.Parameters)
                {
                    if (IsSelfCalling(functionName, parameterRuntimeTreeNode))
                    {
                        return true;
                    }
                }

                return false;
            }

            return false;
        }
    }
}
