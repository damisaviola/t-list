import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function Contact() {
  return (
    <section className="pb-24">
      <h2 className="text-3xl mb-6">Let’s Connect</h2>
      <div className="flex gap-6 text-2xl">
        <FaGithub />
        <FaLinkedin />
      </div>
    </section>
  )
}
