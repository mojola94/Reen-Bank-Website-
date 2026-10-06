const faqs = [
  {
    question: "How do I sign up for an account with Reen Bank?",
    answer:
      "Click Get Started, enter your details, and complete the email verification demo to explore your dashboard.",
  },
  {
    question: "What types of accounts does Reen Bank offer?",
    answer:
      "Reen Bank offers a variety of accounts to suit your financial needs, including savings accounts, checking accounts, and credit cards. We also offer loans, investment services, and other financial products.",
  },
  {
    question: "Is Reen Bank FDIC insured?",
    answer:
      "This is a fictional banking interface, not an insured financial institution. No deposits are accepted. The insurance claim shown in the supplied mockup is not a verified claim.",
  },
  {
    question: "How can I access my Reen Bank account online?",
    answer:
      "You can access the demo by logging in with your demo email and a sample password. From there, you can view balances and explore simulated transactions.",
  },
  {
    question:
      "What security measures does Reen Bank have in place to protect my financial information?",
    answer:
      "A production bank would require encryption, two-factor authentication, fraud detection, and ongoing security monitoring. This frontend prototype does not implement production banking security; do not enter sensitive information.",
  },
];
function showFaq(selected) {
  document.getElementById("faq-title").textContent = faqs[selected].question;
  document.getElementById("faq-answer").textContent = faqs[selected].answer;
  const list = document.getElementById("faq-list");
  list.replaceChildren();
  faqs.forEach((faq, index) => {
    if (index === selected) return;
    const button = document.createElement("button");
    button.className =
      "flex justify-between gap-6 text-left text-lg font-semibold text-[#4c2879] underline underline-offset-4";
    button.textContent = faq.question + "   →";
    button.addEventListener("click", () => showFaq(index));
    list.append(button);
  });
}
showFaq(0);
document.getElementById("newsletter").addEventListener("submit", (event) => {
  event.preventDefault();
  sessionStorage.setItem(
    "prefillEmail",
    document.getElementById("start-email").value,
  );
  location.href = "register.html";
});
