export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      car_attributes: {
        Row: {
          car_id: string
          id: string
          is_available: boolean | null
          label: string
          section: string
          sort_order: number
          value: string | null
        }
        Insert: {
          car_id: string
          id?: string
          is_available?: boolean | null
          label: string
          section: string
          sort_order?: number
          value?: string | null
        }
        Update: {
          car_id?: string
          id?: string
          is_available?: boolean | null
          label?: string
          section?: string
          sort_order?: number
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_attributes_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      car_images: {
        Row: {
          alt: string | null
          car_id: string
          created_at: string
          id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          car_id: string
          created_at?: string
          id?: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          car_id?: string
          created_at?: string
          id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_images_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          badges: string[]
          brand: string
          category: string
          consumption: string | null
          cover_image: string | null
          created_at: string
          fuel_type: string | null
          gear: string | null
          id: string
          intro: string | null
          is_published: boolean
          model: string
          monthly: number | null
          name: string
          price: number | null
          seats: number | null
          slug: string
          sort_order: number
          tire: string | null
          updated_at: string
          views: number
          year: number
        }
        Insert: {
          badges?: string[]
          brand: string
          category: string
          consumption?: string | null
          cover_image?: string | null
          created_at?: string
          fuel_type?: string | null
          gear?: string | null
          id?: string
          intro?: string | null
          is_published?: boolean
          model: string
          monthly?: number | null
          name: string
          price?: number | null
          seats?: number | null
          slug: string
          sort_order?: number
          tire?: string | null
          updated_at?: string
          views?: number
          year: number
        }
        Update: {
          badges?: string[]
          brand?: string
          category?: string
          consumption?: string | null
          cover_image?: string | null
          created_at?: string
          fuel_type?: string | null
          gear?: string | null
          id?: string
          intro?: string | null
          is_published?: boolean
          model?: string
          monthly?: number | null
          name?: string
          price?: number | null
          seats?: number | null
          slug?: string
          sort_order?: number
          tire?: string | null
          updated_at?: string
          views?: number
          year?: number
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          message: string
          phone: string
          reference: string
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          message: string
          phone: string
          reference?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          message?: string
          phone?: string
          reference?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          id: string
          is_published: boolean
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string
          created_at?: string
          id?: string
          is_published?: boolean
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          id?: string
          is_published?: boolean
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          assigned_to: string | null
          created_at: string
          cv_path: string | null
          email: string | null
          full_name: string
          id: string
          job_slug: string | null
          phone: string
          reference: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          cv_path?: string | null
          email?: string | null
          full_name: string
          id?: string
          job_slug?: string | null
          phone: string
          reference?: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          cv_path?: string | null
          email?: string | null
          full_name?: string
          id?: string
          job_slug?: string | null
          phone?: string
          reference?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          id: string
          is_published: boolean
          location: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          is_published?: boolean
          location?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          is_published?: boolean
          location?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      lead_notes: {
        Row: {
          author_id: string | null
          body: string
          created_at: string
          id: string
          lead_id: string
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string
          id?: string
          lead_id: string
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string
          id?: string
          lead_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_to: string | null
          car_id: string | null
          car_name: string | null
          company_name: string | null
          cr_number: string | null
          created_at: string
          down_payment: number | null
          email: string | null
          employer: string | null
          estimated_monthly: number | null
          full_name: string
          id: string
          lead_type: string
          monthly_salary: number | null
          notes: string | null
          offer_id: string | null
          payment_type: string
          phone: string
          reference: string
          region: string | null
          status: string
          term_months: number | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          car_id?: string | null
          car_name?: string | null
          company_name?: string | null
          cr_number?: string | null
          created_at?: string
          down_payment?: number | null
          email?: string | null
          employer?: string | null
          estimated_monthly?: number | null
          full_name: string
          id?: string
          lead_type?: string
          monthly_salary?: number | null
          notes?: string | null
          offer_id?: string | null
          payment_type?: string
          phone: string
          reference?: string
          region?: string | null
          status?: string
          term_months?: number | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          car_id?: string | null
          car_name?: string | null
          company_name?: string | null
          cr_number?: string | null
          created_at?: string
          down_payment?: number | null
          email?: string | null
          employer?: string | null
          estimated_monthly?: number | null
          full_name?: string
          id?: string
          lead_type?: string
          monthly_salary?: number | null
          notes?: string | null
          offer_id?: string | null
          payment_type?: string
          phone?: string
          reference?: string
          region?: string | null
          status?: string
          term_months?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "offers"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          body: string | null
          car_id: string | null
          created_at: string
          expires_at: string | null
          id: string
          image: string | null
          is_published: boolean
          offer_type: string
          slug: string
          subtitle: string | null
          terms: string[]
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          car_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          image?: string | null
          is_published?: boolean
          offer_type?: string
          slug: string
          subtitle?: string | null
          terms?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          car_id?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          image?: string | null
          is_published?: boolean
          offer_type?: string
          slug?: string
          subtitle?: string | null
          terms?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          body: string | null
          category: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          is_published: boolean
          published_at: string
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          category?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          is_published?: boolean
          published_at?: string
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_bookings: {
        Row: {
          assigned_to: string | null
          branch: string | null
          car_info: string | null
          created_at: string
          full_name: string
          id: string
          notes: string | null
          phone: string
          preferred_at: string | null
          reference: string
          service_slug: string
          status: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          branch?: string | null
          car_info?: string | null
          created_at?: string
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          preferred_at?: string | null
          reference?: string
          service_slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          branch?: string | null
          car_info?: string | null
          created_at?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          preferred_at?: string | null
          reference?: string
          service_slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_published: boolean
          slug: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      next_reference: { Args: { _prefix: string }; Returns: string }
    }
    Enums: {
      app_role: "admin" | "sales" | "content"
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
  public: {
    Enums: {
      app_role: ["admin", "sales", "content"],
    },
  },
} as const
