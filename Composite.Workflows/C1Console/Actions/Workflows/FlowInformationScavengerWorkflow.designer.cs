using System;
using System.ComponentModel;
using System.ComponentModel.Design;
using System.Collections;
using System.Drawing;
using System.Reflection;
using System.Workflow.ComponentModel.Compiler;
using System.Workflow.ComponentModel.Serialization;
using System.Workflow.ComponentModel;
using System.Workflow.ComponentModel.Design;
using System.Workflow.Runtime;
using System.Workflow.Activities;
using System.Workflow.Activities.Rules;
using Composite.C1Console.Workflow;

namespace Composite.C1Console.Actions.Workflows
{
    partial class FlowInformationScavengerWorkflow
    {
        #region Designer generated code
        
        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this� method with the code editor.
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCode]
        private void InitializeComponent()
        {
            this.CanModifyActivities = true;
            this.setStateActivity1 = new System.Workflow.Activities.SetStateActivity();
            this.delayActivity1 = new System.Workflow.Activities.DelayActivity();
            this.setStateActivity2 = new System.Workflow.Activities.SetStateActivity();
            this.scavengeCodeActivity = new System.Workflow.Activities.CodeActivity();
            this.waitEventDrivenActivity = new System.Workflow.Activities.EventDrivenActivity();
            this.waitStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.scavengeStateInitializationActivity = new System.Workflow.Activities.StateInitializationActivity();
            this.waitStateActivity = new System.Workflow.Activities.StateActivity();
            this.finalStateActivity = new System.Workflow.Activities.StateActivity();
            this.scavengeStateActivity = new System.Workflow.Activities.StateActivity();
            // 
            // setStateActivity1
            // 
            this.setStateActivity1.Name = "setStateActivity1";
            this.setStateActivity1.TargetStateName = "scavengeStateActivity";
            // 
            // delayActivity1
            // 
            this.delayActivity1.Name = "delayActivity1";
            this.delayActivity1.TimeoutDuration = System.TimeSpan.Parse("00:00:00");
            this.delayActivity1.InitializeTimeoutDuration += new System.EventHandler(this.OnInitializeTimeout);
            // 
            // setStateActivity2
            // 
            this.setStateActivity2.Name = "setStateActivity2";
            this.setStateActivity2.TargetStateName = "waitStateActivity";
            // 
            // scavengeCodeActivity
            // 
            this.scavengeCodeActivity.Name = "scavengeCodeActivity";
            this.scavengeCodeActivity.ExecuteCode += new System.EventHandler(this.scavengeCodeActivity_ExecuteCode);
            // 
            // waitEventDrivenActivity
            // 
            this.waitEventDrivenActivity.Activities.Add(this.delayActivity1);
            this.waitEventDrivenActivity.Activities.Add(this.setStateActivity1);
            this.waitEventDrivenActivity.Name = "waitEventDrivenActivity";
            // 
            // waitStateInitializationActivity
            // 
            this.waitStateInitializationActivity.Name = "waitStateInitializationActivity";
            // 
            // scavengeStateInitializationActivity
            // 
            this.scavengeStateInitializationActivity.Activities.Add(this.scavengeCodeActivity);
            this.scavengeStateInitializationActivity.Activities.Add(this.setStateActivity2);
            this.scavengeStateInitializationActivity.Name = "scavengeStateInitializationActivity";
            // 
            // waitStateActivity
            // 
            this.waitStateActivity.Activities.Add(this.waitStateInitializationActivity);
            this.waitStateActivity.Activities.Add(this.waitEventDrivenActivity);
            this.waitStateActivity.Name = "waitStateActivity";
            // 
            // finalStateActivity
            // 
            this.finalStateActivity.Name = "finalStateActivity";
            // 
            // scavengeStateActivity
            // 
            this.scavengeStateActivity.Activities.Add(this.scavengeStateInitializationActivity);
            this.scavengeStateActivity.Name = "scavengeStateActivity";
            // 
            // FlowInformationScavengerWorkflow
            // 
            this.Activities.Add(this.scavengeStateActivity);
            this.Activities.Add(this.finalStateActivity);
            this.Activities.Add(this.waitStateActivity);
            this.CompletedStateName = "finalStateActivity";
            this.DynamicUpdateCondition = null;
            this.InitialStateName = "scavengeStateActivity";
            this.Name = "FlowInformationScavengerWorkflow";
            this.CanModifyActivities = false;

        }

        #endregion

        private StateInitializationActivity scavengeStateInitializationActivity;
        private DelayActivity delayActivity1;
        private EventDrivenActivity waitEventDrivenActivity;
        private StateInitializationActivity waitStateInitializationActivity;
        private StateActivity waitStateActivity;
        private StateActivity finalStateActivity;
        private SetStateActivity setStateActivity1;
        private CodeActivity scavengeCodeActivity;
        private SetStateActivity setStateActivity2;
        private StateActivity scavengeStateActivity;


















































































































    }
}
