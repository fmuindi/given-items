export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_hash: string | null
          city: string
          country: string
          created_at: string
          id: string
          label: string | null
          lat: number | null
          line1: string
          line2: string | null
          lng: number | null
          place_id: string | null
          postal_code: string
          state: string
          updated_at: string
          user_id: string
          validation_status: Database["public"]["Enums"]["address_validation_status"]
        }
        Insert: {
          address_hash?: string | null
          city: string
          country?: string
          created_at?: string
          id?: string
          label?: string | null
          lat?: number | null
          line1: string
          line2?: string | null
          lng?: number | null
          place_id?: string | null
          postal_code: string
          state: string
          updated_at?: string
          user_id: string
          validation_status?: Database["public"]["Enums"]["address_validation_status"]
        }
        Update: {
          address_hash?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          label?: string | null
          lat?: number | null
          line1?: string
          line2?: string | null
          lng?: number | null
          place_id?: string | null
          postal_code?: string
          state?: string
          updated_at?: string
          user_id?: string
          validation_status?: Database["public"]["Enums"]["address_validation_status"]
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor: string | null
          after: Json | null
          before: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
          request_id: string | null
        }
        Insert: {
          action: string
          actor?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
          request_id?: string | null
        }
        Update: {
          action?: string
          actor?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_fkey"
            columns: ["actor"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          created_at: string
          entitlement_consumed_at: string | null
          id: string
          listing_id: string
          program_key: string
          reservation_id: string
          status: Database["public"]["Enums"]["claim_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          entitlement_consumed_at?: string | null
          id?: string
          listing_id: string
          program_key?: string
          reservation_id: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          entitlement_consumed_at?: string | null
          id?: string
          listing_id?: string
          program_key?: string
          reservation_id?: string
          status?: Database["public"]["Enums"]["claim_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "claims_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "public_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: true
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donor_submissions: {
        Row: {
          address_line1: string
          assigned_to: string | null
          category_slug: string
          city: string
          condition: Database["public"]["Enums"]["condition_grade"]
          consent_version: string
          created_at: string
          delivery_type: Database["public"]["Enums"]["delivery_type"]
          description: string
          dimensions: string | null
          email: string
          full_name: string
          id: string
          included_parts: string | null
          known_defects: string | null
          phone: string
          postal_code: string
          state: string
          status: Database["public"]["Enums"]["submission_status"]
          submitted_at: string
          title: string
          updated_at: string
          weight: string | null
        }
        Insert: {
          address_line1: string
          assigned_to?: string | null
          category_slug: string
          city: string
          condition: Database["public"]["Enums"]["condition_grade"]
          consent_version?: string
          created_at?: string
          delivery_type: Database["public"]["Enums"]["delivery_type"]
          description: string
          dimensions?: string | null
          email: string
          full_name: string
          id?: string
          included_parts?: string | null
          known_defects?: string | null
          phone: string
          postal_code: string
          state: string
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          title: string
          updated_at?: string
          weight?: string | null
        }
        Update: {
          address_line1?: string
          assigned_to?: string | null
          category_slug?: string
          city?: string
          condition?: Database["public"]["Enums"]["condition_grade"]
          consent_version?: string
          created_at?: string
          delivery_type?: Database["public"]["Enums"]["delivery_type"]
          description?: string
          dimensions?: string | null
          email?: string
          full_name?: string
          id?: string
          included_parts?: string | null
          known_defects?: string | null
          phone?: string
          postal_code?: string
          state?: string
          status?: Database["public"]["Enums"]["submission_status"]
          submitted_at?: string
          title?: string
          updated_at?: string
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donor_submissions_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donor_verifications: {
        Row: {
          check_type: Database["public"]["Enums"]["verification_check_type"]
          evidence_ref: string | null
          id: string
          note: string | null
          result: Database["public"]["Enums"]["verification_result"]
          reviewed_at: string
          reviewer: string
          submission_id: string
        }
        Insert: {
          check_type: Database["public"]["Enums"]["verification_check_type"]
          evidence_ref?: string | null
          id?: string
          note?: string | null
          result: Database["public"]["Enums"]["verification_result"]
          reviewed_at?: string
          reviewer: string
          submission_id: string
        }
        Update: {
          check_type?: Database["public"]["Enums"]["verification_check_type"]
          evidence_ref?: string | null
          id?: string
          note?: string | null
          result?: Database["public"]["Enums"]["verification_result"]
          reviewed_at?: string
          reviewer?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "donor_verifications_reviewer_fkey"
            columns: ["reviewer"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donor_verifications_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "donor_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      fulfillments: {
        Row: {
          claim_id: string
          created_at: string
          id: string
          method: Database["public"]["Enums"]["delivery_type"]
          provider: string | null
          provider_shipment_id: string | null
          status: Database["public"]["Enums"]["fulfillment_status"]
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
        }
        Insert: {
          claim_id: string
          created_at?: string
          id?: string
          method: Database["public"]["Enums"]["delivery_type"]
          provider?: string | null
          provider_shipment_id?: string | null
          status?: Database["public"]["Enums"]["fulfillment_status"]
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
        }
        Update: {
          claim_id?: string
          created_at?: string
          id?: string
          method?: Database["public"]["Enums"]["delivery_type"]
          provider?: string | null
          provider_shipment_id?: string | null
          status?: Database["public"]["Enums"]["fulfillment_status"]
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fulfillments_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: true
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      item_media: {
        Row: {
          alt_text: string | null
          bucket: string
          created_at: string
          id: string
          is_public: boolean
          item_id: string
          path: string
          sort_order: number
        }
        Insert: {
          alt_text?: string | null
          bucket: string
          created_at?: string
          id?: string
          is_public?: boolean
          item_id: string
          path: string
          sort_order?: number
        }
        Update: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          id?: string
          is_public?: boolean
          item_id?: string
          path?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "item_media_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          category_slug: string
          condition: Database["public"]["Enums"]["condition_grade"]
          created_at: string
          delivery_type: Database["public"]["Enums"]["delivery_type"]
          dimensions: string | null
          id: string
          included_parts: string | null
          known_defects: string
          submission_id: string
          updated_at: string
          verification_snapshot: Json
          weight: string | null
        }
        Insert: {
          category_slug: string
          condition: Database["public"]["Enums"]["condition_grade"]
          created_at?: string
          delivery_type: Database["public"]["Enums"]["delivery_type"]
          dimensions?: string | null
          id?: string
          included_parts?: string | null
          known_defects: string
          submission_id: string
          updated_at?: string
          verification_snapshot?: Json
          weight?: string | null
        }
        Update: {
          category_slug?: string
          condition?: Database["public"]["Enums"]["condition_grade"]
          created_at?: string
          delivery_type?: Database["public"]["Enums"]["delivery_type"]
          dimensions?: string | null
          id?: string
          included_parts?: string | null
          known_defects?: string
          submission_id?: string
          updated_at?: string
          verification_snapshot?: Json
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "donor_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          approved_by: string | null
          category_slug: string
          city: string
          condition: Database["public"]["Enums"]["condition_grade"]
          created_at: string
          description: string
          id: string
          item_id: string
          policy_version: string
          published_at: string | null
          published_by: string | null
          slug: string
          state: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
          updated_at: string
        }
        Insert: {
          approved_by?: string | null
          category_slug: string
          city: string
          condition: Database["public"]["Enums"]["condition_grade"]
          created_at?: string
          description: string
          id?: string
          item_id: string
          policy_version?: string
          published_at?: string | null
          published_by?: string | null
          slug: string
          state: string
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
          updated_at?: string
        }
        Update: {
          approved_by?: string | null
          category_slug?: string
          city?: string
          condition?: Database["public"]["Enums"]["condition_grade"]
          created_at?: string
          description?: string
          id?: string
          item_id?: string
          policy_version?: string
          published_at?: string | null
          published_by?: string | null
          slug?: string
          state?: string
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          claim_id: string | null
          created_at: string
          currency: string
          delivery_amount: number
          external_id: string | null
          id: string
          idempotency_key: string
          item_amount: number
          provider: string
          reservation_id: string | null
          service_fee_amount: number
          status: Database["public"]["Enums"]["payment_status"]
          tax_amount: number
          total_amount: number
          updated_at: string
        }
        Insert: {
          claim_id?: string | null
          created_at?: string
          currency?: string
          delivery_amount?: number
          external_id?: string | null
          id?: string
          idempotency_key: string
          item_amount?: number
          provider?: string
          reservation_id?: string | null
          service_fee_amount?: number
          status?: Database["public"]["Enums"]["payment_status"]
          tax_amount?: number
          total_amount: number
          updated_at?: string
        }
        Update: {
          claim_id?: string | null
          created_at?: string
          currency?: string
          delivery_amount?: number
          external_id?: string | null
          id?: string
          idempotency_key?: string
          item_amount?: number
          provider?: string
          reservation_id?: string | null
          service_fee_amount?: number
          status?: Database["public"]["Enums"]["payment_status"]
          tax_amount?: number
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          legal_name: string | null
          phone: string | null
          phone_verified_at: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["profile_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          legal_name?: string | null
          phone?: string | null
          phone_verified_at?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          legal_name?: string | null
          phone?: string | null
          phone_verified_at?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["profile_status"]
          updated_at?: string
        }
        Relationships: []
      }
      recipient_eligibility: {
        Row: {
          created_at: string
          id: string
          program_key: string
          reason_code: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["eligibility_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          program_key?: string
          reason_code?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["eligibility_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          program_key?: string
          reason_code?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["eligibility_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipient_eligibility_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipient_eligibility_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          address_id: string | null
          created_at: string
          expires_at: string
          id: string
          listing_id: string
          quote_snapshot: Json | null
          status: Database["public"]["Enums"]["reservation_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          address_id?: string | null
          created_at?: string
          expires_at: string
          id?: string
          listing_id: string
          quote_snapshot?: Json | null
          status?: Database["public"]["Enums"]["reservation_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          address_id?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          listing_id?: string
          quote_snapshot?: Json | null
          status?: Database["public"]["Enums"]["reservation_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "public_listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_cases: {
        Row: {
          assigned_to: string | null
          category: string
          claim_id: string | null
          created_at: string
          id: string
          priority: Database["public"]["Enums"]["support_priority"]
          reference_code: string
          status: Database["public"]["Enums"]["support_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category: string
          claim_id?: string | null
          created_at?: string
          id?: string
          priority?: Database["public"]["Enums"]["support_priority"]
          reference_code?: string
          status?: Database["public"]["Enums"]["support_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string
          claim_id?: string | null
          created_at?: string
          id?: string
          priority?: Database["public"]["Enums"]["support_priority"]
          reference_code?: string
          status?: Database["public"]["Enums"]["support_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_cases_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_cases_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_cases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_events: {
        Row: {
          event_type: string | null
          external_event_id: string
          id: string
          payload: Json | null
          processed_at: string | null
          provider: string
          received_at: string
          result: string | null
        }
        Insert: {
          event_type?: string | null
          external_event_id: string
          id?: string
          payload?: Json | null
          processed_at?: string | null
          provider: string
          received_at?: string
          result?: string | null
        }
        Update: {
          event_type?: string | null
          external_event_id?: string
          id?: string
          payload?: Json | null
          processed_at?: string | null
          provider?: string
          received_at?: string
          result?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      public_listings: {
        Row: {
          category_slug: string | null
          city: string | null
          condition: Database["public"]["Enums"]["condition_grade"] | null
          created_at: string | null
          delivery_type: Database["public"]["Enums"]["delivery_type"] | null
          description: string | null
          dimensions: string | null
          id: string | null
          included_parts: string | null
          known_defects: string | null
          published_at: string | null
          slug: string | null
          state: string | null
          status: Database["public"]["Enums"]["listing_status"] | null
          title: string | null
          weight: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      current_role_is: {
        Args: { roles: Database["public"]["Enums"]["user_role"][] }
        Returns: boolean
      }
      generate_reference_code: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
      log_audit: {
        Args: {
          p_action: string
          p_actor: string
          p_after?: Json
          p_before?: Json
          p_entity_id: string
          p_entity_type: string
          p_request_id?: string
        }
        Returns: undefined
      }
      reserve_listing: {
        Args: { p_address_id: string; p_listing_id: string }
        Returns: {
          address_id: string | null
          created_at: string
          expires_at: string
          id: string
          listing_id: string
          quote_snapshot: Json | null
          status: Database["public"]["Enums"]["reservation_status"]
          updated_at: string
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "reservations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
    }
    Enums: {
      address_validation_status:
        | "unvalidated"
        | "validated"
        | "needs_confirmation"
        | "invalid"
      claim_status: "pending" | "paid" | "fulfilled" | "cancelled" | "refunded"
      condition_grade: "like_new" | "good" | "fair" | "working" | "needs_repair"
      delivery_type: "parcel" | "local_delivery" | "pickup" | "manual_freight"
      eligibility_status:
        | "pending"
        | "eligible"
        | "ineligible"
        | "manual_review"
      fulfillment_status:
        | "awaiting_donor"
        | "ready"
        | "label_created"
        | "picked_up"
        | "in_transit"
        | "exception"
        | "delivered"
        | "returned"
      listing_status:
        | "draft"
        | "scheduled"
        | "available"
        | "reserved"
        | "claimed"
        | "fulfillment"
        | "delivered"
        | "cancelled"
        | "archived"
      payment_status:
        | "created"
        | "pending"
        | "paid"
        | "failed"
        | "refunded"
        | "partially_refunded"
        | "disputed"
      profile_status: "active" | "restricted" | "banned"
      reservation_status:
        | "active"
        | "checkout_started"
        | "expired"
        | "converted"
        | "cancelled"
      submission_status:
        | "draft"
        | "submitted"
        | "needs_information"
        | "under_review"
        | "approved"
        | "rejected"
        | "withdrawn"
      support_priority: "low" | "normal" | "high" | "urgent"
      support_status: "open" | "in_progress" | "resolved" | "closed"
      user_role: "recipient" | "operator" | "verifier" | "admin"
      verification_check_type:
        | "identity"
        | "ownership"
        | "existence"
        | "condition"
        | "safety_recall"
        | "logistics"
      verification_result: "pass" | "needs_information" | "escalate" | "fail"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      address_validation_status: [
        "unvalidated",
        "validated",
        "needs_confirmation",
        "invalid",
      ],
      claim_status: ["pending", "paid", "fulfilled", "cancelled", "refunded"],
      condition_grade: ["like_new", "good", "fair", "working", "needs_repair"],
      delivery_type: ["parcel", "local_delivery", "pickup", "manual_freight"],
      eligibility_status: [
        "pending",
        "eligible",
        "ineligible",
        "manual_review",
      ],
      fulfillment_status: [
        "awaiting_donor",
        "ready",
        "label_created",
        "picked_up",
        "in_transit",
        "exception",
        "delivered",
        "returned",
      ],
      listing_status: [
        "draft",
        "scheduled",
        "available",
        "reserved",
        "claimed",
        "fulfillment",
        "delivered",
        "cancelled",
        "archived",
      ],
      payment_status: [
        "created",
        "pending",
        "paid",
        "failed",
        "refunded",
        "partially_refunded",
        "disputed",
      ],
      profile_status: ["active", "restricted", "banned"],
      reservation_status: [
        "active",
        "checkout_started",
        "expired",
        "converted",
        "cancelled",
      ],
      submission_status: [
        "draft",
        "submitted",
        "needs_information",
        "under_review",
        "approved",
        "rejected",
        "withdrawn",
      ],
      support_priority: ["low", "normal", "high", "urgent"],
      support_status: ["open", "in_progress", "resolved", "closed"],
      user_role: ["recipient", "operator", "verifier", "admin"],
      verification_check_type: [
        "identity",
        "ownership",
        "existence",
        "condition",
        "safety_recall",
        "logistics",
      ],
      verification_result: ["pass", "needs_information", "escalate", "fail"],
    },
  },
} as const

