"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TermsAndConditionsProps {
  accepted: boolean
  onAcceptChange: (accepted: boolean) => void
}

export default function TermsAndConditions({ accepted, onAcceptChange }: TermsAndConditionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <Checkbox id="terms" checked={accepted} onCheckedChange={(checked) => onAcceptChange(checked as boolean)} />
        <div className="grid gap-1.5 leading-none">
          <div className="flex items-center space-x-1">
            <Label htmlFor="terms">I agree to the</Label>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="p-0 h-auto font-normal">
                  Terms & Conditions
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Terms & Conditions Policy</DialogTitle>
                  <DialogDescription>
                    Effective Date: 09.02.2025
                    <br />
                    Last Updated: 09.02.2025
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] mt-4">
                  <div className="space-y-4 text-sm pr-4">
                    <section>
                      <h3 className="font-semibold">1. Introduction</h3>
                      <p>
                        Welcome to SendMe. By accessing or using our platform, you agree to these Terms & Conditions
                        ("T&C"). These terms govern the relationship between SendMe, customers, vendors, and delivery
                        partners. If you do not agree with these terms, please do not use our services.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold">2. Definitions</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>"SendMe" refers to the company operating the platform.</li>
                        <li>"Customer" refers to any individual or business using SendMe to place orders.</li>
                        <li>"Vendor" refers to suppliers, merchants, or sellers offering goods.</li>
                        <li>"Delivery Partner" refers to independent couriers or third-party logistics providers.</li>
                        <li>"Platform" refers to the SendMe website, app, WhatsApp service, or any other interface.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">3. Order Process</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          Orders must be placed via the SendMe platform, including WhatsApp, mobile app, or website.
                        </li>
                        <li>
                          SendMe reserves the right to accept, modify, or reject any order based on availability,
                          payment issues, or suspected fraud.
                        </li>
                        <li>
                          Customers must provide accurate delivery details. SendMe is not responsible for delays caused
                          by incorrect addresses or phone numbers.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">4. Pricing & Payment</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>All prices are listed in Zambian Kwacha (ZMW) and include VAT unless stated otherwise.</li>
                        <li>
                          Prices may change due to market fluctuations. Customers will be notified of price adjustments
                          before order confirmation.
                        </li>
                        <li>
                          Payment methods accepted: Mobile Money (Airtel, MTN, Zamtel), Bank Transfer, and Cash on
                          Delivery (COD) (only for eligible items).
                        </li>
                        <li>In case of failed payments, orders will not be processed.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">5. Cancellation & Refunds</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          Customers may cancel orders before they are dispatched. Once dispatched, cancellations are not
                          allowed.
                        </li>
                        <li>
                          Refunds are only issued for:
                          <ul className="list-disc pl-4">
                            <li>Wrong items delivered</li>
                            <li>Missing items</li>
                            <li>Damaged items (with proof)</li>
                          </ul>
                        </li>
                        <li>Refund requests must be submitted within 24 hours of delivery.</li>
                        <li>Refunds are processed within 7 business days via the original payment method.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">6. Delivery & Pickup</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          Delivery Time: Orders are delivered based on selected time slots. Unexpected delays due to
                          traffic, weather, or supplier issues are not SendMe's responsibility.
                        </li>
                        <li>
                          Failed Delivery Attempts: If the customer is unavailable, the delivery will be rescheduled,
                          and an additional charge may apply.
                        </li>
                        <li>
                          Pickup Orders: Customers must collect their items within 48 hours from the specified pickup
                          location.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">7. Customer Responsibilities</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Provide accurate and up-to-date contact and delivery information.</li>
                        <li>Ensure someone is available to receive the order at the chosen delivery time.</li>
                        <li>Use SendMe services in a lawful manner without engaging in fraudulent activities.</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">8. Liability & Disclaimers</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          SendMe acts as an intermediary between vendors and customers. We are not responsible for
                          defects, warranties, or product failures.
                        </li>
                        <li>
                          We are not liable for indirect losses, including loss of profits or business interruptions.
                        </li>
                        <li>
                          Force Majeure: SendMe is not responsible for service disruptions caused by natural disasters,
                          government regulations, or unforeseen circumstances.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">9. Fraud Prevention & Account Termination</h3>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          Any fraudulent activity, chargebacks, or misuse of the platform will lead to immediate account
                          suspension.
                        </li>
                        <li>
                          SendMe reserves the right to refuse service to any customer engaging in suspicious behavior.
                        </li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold">10. Amendments</h3>
                      <p>
                        SendMe may update these Terms & Conditions at any time. Continued use of our services
                        constitutes acceptance of the updated terms.
                      </p>
                    </section>

                    <section>
                      <h3 className="font-semibold">11. Contact Information</h3>
                      <p>For any inquiries regarding these Terms & Conditions, contact:</p>
                      <p>📧 Email: munjilacouriers@gmail.com</p>
                      <p>📞 Phone: +260979013006</p>
                    </section>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-muted-foreground">
            You must accept the terms and conditions before submitting your order.
          </p>
        </div>
      </div>
    </div>
  )
}

