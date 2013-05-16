using System;
using System.Collections.Generic;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.Core.Serialization;
using Composite.Core.Types;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ActionExecutor(typeof(WorkflowActionExecutor))]
    public class WorkflowActionToken : ActionToken
    {
        private IEnumerable<PermissionType> _permissionTypes;


        /// <exclude />
        public WorkflowActionToken(Type workflowType)
            : this(workflowType, null)
        {
        }


        /// <exclude />
        public WorkflowActionToken(Type workflowType, IEnumerable<PermissionType> permissionType)
        {
            if (workflowType == null) throw new ArgumentNullException("workflowType");

            if (permissionType != null)
            {
                _permissionTypes = permissionType;
            }
            else
            {
                _permissionTypes = new List<PermissionType>();
            }

            this.WorkflowType = workflowType;
            this.ParentWorkflowInstanceId = Guid.Empty;
            this.Payload = "";
            this.ExtraPayload = "";
            this.EventHandleFilterType = null;
        }


        /// <exclude />
        public Type WorkflowType
        {
            get;
            private set;
        }


        /// <exclude />
        public Guid ParentWorkflowInstanceId
        {
            get;
            set;
        }


        // User defined data to the workflow
        /// <exclude />
        public string Payload
        {
            get;
            set;
        }



        // User defined data to the workflow
        /// <exclude />
        public string ExtraPayload
        {
            get;
            set;
        }


        /// <exclude />
        public bool DoIgnoreEntityTokenLocking
        {
            get;
            set;
        }


        /// <exclude />
        public Type EventHandleFilterType
        {
            get;
            set;
        }


        /// <exclude />
        public override bool IgnoreEntityTokenLocking
        {
            get { return this.DoIgnoreEntityTokenLocking; }
        }


        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes
        {
            get
            {
                return _permissionTypes;
            }
        }


        /// <exclude />
        public override string Serialize()
        {
            StringBuilder stringBuilder = new StringBuilder();

            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_WorkflowType_", TypeManager.SerializeType(this.WorkflowType));
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_Payload_", this.Payload);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_ExtraPayload_", this.ExtraPayload);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_Ignore_", this.DoIgnoreEntityTokenLocking);
            StringConversionServices.SerializeKeyValuePair(stringBuilder, "_PermissionTypes_", this.PermissionTypes.SerializePermissionTypes());
            if (this.EventHandleFilterType != null)
            {
                string serializedType = TypeManager.SerializeType(this.EventHandleFilterType);
                StringConversionServices.SerializeKeyValuePair(stringBuilder, "_EventHandleFilterType_", serializedType);
            }

            return stringBuilder.ToString();
        }


        /// <exclude />
        public static ActionToken Deserialize(string serialiedWorkflowActionToken)
        {
            Dictionary<string, string> dic = StringConversionServices.ParseKeyValueCollection(serialiedWorkflowActionToken);

            if ((dic.ContainsKey("_WorkflowType_") == false) ||
                (dic.ContainsKey("_Payload_") == false) ||
                (dic.ContainsKey("_ExtraPayload_") == false) ||
                (dic.ContainsKey("_Ignore_") == false) ||
                (dic.ContainsKey("_PermissionTypes_") == false))
            {
                throw new ArgumentException("The serialiedWorkflowActionToken is not a serialized WorkflowActionToken", "serialiedWorkflowActionToken");
            }

            string serializedType = StringConversionServices.DeserializeValueString(dic["_WorkflowType_"]);
            Type type = TypeManager.GetType(serializedType);

            string permissionTypesString = StringConversionServices.DeserializeValueString(dic["_PermissionTypes_"]);

            WorkflowActionToken workflowActionToken = new WorkflowActionToken(type, permissionTypesString.DesrializePermissionTypes());

            string payload = StringConversionServices.DeserializeValueString(dic["_Payload_"]);
            workflowActionToken.Payload = payload;

            string extraPayload = StringConversionServices.DeserializeValueString(dic["_ExtraPayload_"]);
            workflowActionToken.ExtraPayload = extraPayload;

            bool ignoreEntityTokenLocking = StringConversionServices.DeserializeValueBool(dic["_Ignore_"]);
            workflowActionToken.DoIgnoreEntityTokenLocking = ignoreEntityTokenLocking;

            if (dic.ContainsKey("_EventHandleFilterType_"))
            {
                string serializedFilterType = StringConversionServices.DeserializeValueString(dic["_EventHandleFilterType_"]);
                workflowActionToken.EventHandleFilterType = TypeManager.GetType(serializedFilterType);
            }

            return workflowActionToken;
        }
    }
}
