export class AutomationCapabilities {
  workflows: string[];
  triggers: string[];
  actions: string[];
  integrations: string[];
  schedulingSupport: boolean;
  conditionalLogic: boolean;
  errorHandling: {
    retry: boolean;
    fallback: boolean;
    notification: boolean;
  };

  toPayload(): Record<string, any> {
    return {
      workflows: this.workflows,
      triggers: this.triggers,
      actions: this.actions,
      integrations: this.integrations,
      schedulingSupport: this.schedulingSupport,
      conditionalLogic: this.conditionalLogic,
      errorHandling: this.errorHandling,
    };
  }

  static fromPayload(payload: any): AutomationCapabilities {
    const capabilities = new AutomationCapabilities();
    capabilities.workflows = payload.workflows;
    capabilities.triggers = payload.triggers;
    capabilities.actions = payload.actions;
    capabilities.integrations = payload.integrations;
    capabilities.schedulingSupport = payload.schedulingSupport;
    capabilities.conditionalLogic = payload.conditionalLogic;
    capabilities.errorHandling = payload.errorHandling;
    return capabilities;
  }
}
