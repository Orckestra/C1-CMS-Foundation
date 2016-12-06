using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.C1Console.Actions;
using Composite.C1Console.Security;
using Composite.Core.Types;
using static Composite.Core.Serialization.StringConversionServices;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ActionExecutor(typeof(WorkflowActionExecutor))]
    public class WorkflowActionToken : ActionToken
    {
        /// <exclude />
        public WorkflowActionToken(Type workflowType)
            : this(workflowType, null)
        {
        }


        /// <exclude />
        public WorkflowActionToken(Type workflowType, IEnumerable<PermissionType> permissionType)
        {
            Verify.ArgumentNotNull(workflowType, nameof(workflowType));

            PermissionTypes = permissionType ?? Enumerable.Empty<PermissionType>();

            this.WorkflowType = workflowType;
            this.ParentWorkflowInstanceId = Guid.Empty;
            this.Payload = "";
            this.ExtraPayload = "";
            this.EventHandleFilterType = null;
        }


        /// <exclude />
        public Type WorkflowType { get; }


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
        public override bool IgnoreEntityTokenLocking => this.DoIgnoreEntityTokenLocking;


        /// <exclude />
        public override IEnumerable<PermissionType> PermissionTypes { get; }


        /// <exclude />
        public override string Serialize()
        {
            var stringBuilder = new StringBuilder();

            SerializeKeyValuePair(stringBuilder, "_WorkflowType_", TypeManager.SerializeType(this.WorkflowType));
            SerializeKeyValuePair(stringBuilder, "_Payload_", this.Payload);
            SerializeKeyValuePair(stringBuilder, "_ExtraPayload_", this.ExtraPayload);
            SerializeKeyValuePair(stringBuilder, "_Ignore_", this.DoIgnoreEntityTokenLocking);
            SerializeKeyValuePair(stringBuilder, "_PermissionTypes_", this.PermissionTypes.SerializePermissionTypes());
            if (this.EventHandleFilterType != null)
            {
                string serializedType = TypeManager.SerializeType(this.EventHandleFilterType);
                SerializeKeyValuePair(stringBuilder, "_EventHandleFilterType_", serializedType);
            }

            return stringBuilder.ToString();
        }


        /// <exclude />
        public static ActionToken Deserialize(string serializedWorkflowActionToken)
        {
            Dictionary<string, string> dic = ParseKeyValueCollection(serializedWorkflowActionToken);

            if (!dic.ContainsKey("_WorkflowType_")
                || !dic.ContainsKey("_Payload_") 
                || !dic.ContainsKey("_ExtraPayload_") 
                || !dic.ContainsKey("_Ignore_") 
                || !dic.ContainsKey("_PermissionTypes_"))
            {
                throw new ArgumentException("The serializedWorkflowActionToken is not a serialized WorkflowActionToken", nameof(serializedWorkflowActionToken));
            }

            string serializedType = DeserializeValueString(dic["_WorkflowType_"]);
            Type type = TypeManager.GetType(serializedType);

            string permissionTypesString = DeserializeValueString(dic["_PermissionTypes_"]);

            var workflowActionToken = new WorkflowActionToken(type, permissionTypesString.DesrializePermissionTypes());

            string payload = DeserializeValueString(dic["_Payload_"]);
            workflowActionToken.Payload = payload;

            string extraPayload = DeserializeValueString(dic["_ExtraPayload_"]);
            workflowActionToken.ExtraPayload = extraPayload;

            bool ignoreEntityTokenLocking = DeserializeValueBool(dic["_Ignore_"]);
            workflowActionToken.DoIgnoreEntityTokenLocking = ignoreEntityTokenLocking;

            if (dic.ContainsKey("_EventHandleFilterType_"))
            {
                string serializedFilterType = DeserializeValueString(dic["_EventHandleFilterType_"]);
                workflowActionToken.EventHandleFilterType = TypeManager.GetType(serializedFilterType);
            }

            return workflowActionToken;
        }
    }
}