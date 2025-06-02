package com.example.CRM_backend.dto;

import java.util.List;

public class SegmentRequest {
    private String logic; // AND / OR
    private List<Rule> rules;

    public static class Rule {
        private String field;
        private String operator;
        private String value;

        // Getters and setters
        public String getField() { return field; }
        public void setField(String field) { this.field = field; }

        public String getOperator() { return operator; }
        public void setOperator(String operator) { this.operator = operator; }

        public String getValue() { return value; }
        public void setValue(String value) { this.value = value; }
    }

    // Getters and setters
    public String getLogic() { return logic; }
    public void setLogic(String logic) { this.logic = logic; }

    public List<Rule> getRules() { return rules; }
    public void setRules(List<Rule> rules) { this.rules = rules; }
}
